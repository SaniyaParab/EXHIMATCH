import React, { useState } from 'react';
import { Building2, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ExhibitorApply() {
  const { exhibitions } = useData();
  const [appliedShows, setAppliedShows] = useState(["exh-1", "exh-2"]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleApply = (exhId) => {
    setAppliedShows(prev => [...prev, exhId]);
    setSuccessMsg("Application submitted to organizer! Status: Pending review.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Apply for Upcoming Trade Shows
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Browse industrial trade fairs and apply for exhibitor floor space.
        </p>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibitions.map(exh => {
          const isApplied = appliedShows.includes(exh.id);
          return (
            <div key={exh.id} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-[10px] uppercase">
                  {exh.categories[0]}
                </span>
                <h3 className="font-black text-base text-slate-900 line-clamp-1">{exh.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{exh.description}</p>

                <div className="pt-2 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exh.start_date} to {exh.end_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exh.city}, {exh.state}</span>
                  </div>
                </div>
              </div>

              <div>
                {isApplied ? (
                  <span className="w-full py-2.5 bg-emerald-50 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Application Submitted
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(exh.id)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Apply for Exhibition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
