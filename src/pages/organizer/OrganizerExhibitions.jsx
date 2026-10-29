import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Calendar, MapPin, Users, Store, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function OrganizerExhibitions() {
  const { exhibitions } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Manage Trade Exhibitions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active and upcoming trade expos managed under your organizer portfolio.
          </p>
        </div>

        <Link
          to="/organizer/exhibitions/create"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Exhibition</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibitions.map(exh => (
          <div key={exh.id} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-[10px] uppercase">
                  {exh.status}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {exh.total_halls || 3} Halls
                </span>
              </div>

              <h3 className="font-black text-base text-slate-900 line-clamp-1">{exh.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{exh.tagline || exh.description}</p>

              <div className="pt-2 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exh.start_date} to {exh.end_date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exh.venue}, {exh.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exh.exhibitor_count || 120} Confirmed Exhibitors</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <Link
                to="/organizer/stalls"
                className="flex-1 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                Manage Floor & Stalls
              </Link>
              <Link
                to={`/buyer/map/${exh.id}`}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                View Map
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
