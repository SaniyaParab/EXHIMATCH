import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, MapPin, Store, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ExhibitorExhibitions() {
  const { exhibitions, stalls } = useData();

  // Find exhibitions where ABC Machinery has stalls or applications
  const myStall = stalls.find(s => s.stall_number === "A24");
  const myExhibition = exhibitions.find(e => e.id === "exh-1") || exhibitions[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            My Exhibitions & Participation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed trade exhibitions, booth allocations, and pending applications.
          </p>
        </div>

        <Link
          to="/exhibitor/apply"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>Apply for New Exhibition</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confirmed Exhibition */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Confirmed & Allocated
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900 font-black text-xs">
              Stall A24
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">{myExhibition.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{myExhibition.venue}, {myExhibition.city}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Dates</span>
              <span className="font-bold text-slate-800">{myExhibition.start_date} to {myExhibition.end_date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Booth Dimensions</span>
              <span className="font-bold text-purple-700">6m x 3m (Hall A)</span>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <Link
              to="/exhibitor/stall"
              className="flex-1 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              Manage Stall A24
            </Link>
            <Link
              to={`/buyer/map/${myExhibition.id}`}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
            >
              Floor Map
            </Link>
          </div>
        </div>

        {/* Applied / Upcoming Exhibition */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-600" />
              Application Approved
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-black text-xs">
              Stall Pending
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">Bharat Automation & Robotics Expo</h3>
            <p className="text-xs text-slate-500 mt-0.5">Yashobhoomi (IICC), New Delhi</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Dates</span>
              <span className="font-bold text-slate-800">2026-12-04 to 2026-12-07</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Target Hall</span>
              <span className="font-bold text-slate-800">Hall 1 (Robotics)</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/exhibitor/stall/request"
              className="w-full block py-2 text-center bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl font-bold text-xs border border-purple-200 transition-colors"
            >
              Select & Request Stall
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
