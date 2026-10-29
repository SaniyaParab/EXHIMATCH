import React from 'react';
import { Layers, Store, Building2, Plus, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export default function OrganizerHalls() {
  const { halls, stalls, exhibitions } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Exhibition Halls & Zones
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hall capacities, architectural floor layouts, and zoning definitions.
          </p>
        </div>

        <Link
          to="/organizer/stalls"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>View Floor Grid</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {halls.map(hall => {
          const exhibition = exhibitions.find(e => e.id === hall.exhibition_id);
          const hallStalls = stalls.filter(s => s.hall_id === hall.id || s.hall_code === hall.code);
          const occupiedCount = hallStalls.filter(s => s.status === 'occupied').length;

          return (
            <div key={hall.id} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-base">
                  {hall.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                  Floor {hall.floor || 1}
                </span>
              </div>

              <div>
                <h3 className="font-black text-base text-slate-900">{hall.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{exhibition?.name || "Manufacturing Expo Mumbai"}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stall Capacity:</span>
                  <span className="font-bold text-slate-900">{hallStalls.length} Stalls</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Occupied Stalls:</span>
                  <span className="font-bold text-blue-600">{occupiedCount} Assigned</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Available:</span>
                  <span className="font-bold text-emerald-600">{hallStalls.length - occupiedCount} Open</span>
                </div>
              </div>

              <Link
                to="/organizer/stalls"
                className="w-full block py-2 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors"
              >
                Inspect Hall {hall.code} Floor Map
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
