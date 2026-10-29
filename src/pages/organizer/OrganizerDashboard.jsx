import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Store, 
  Send, 
  CheckCircle2, 
  XCircle, 
  CalendarCheck, 
  TrendingUp, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useData } from '../../context/DataContext';

export default function OrganizerDashboard() {
  const { 
    exhibitions, 
    stalls, 
    stallRequests, 
    approveStallRequest, 
    rejectStallRequest,
    appointments,
    leads 
  } = useData();

  const occupiedStalls = stalls.filter(s => s.status === 'occupied').length;
  const availableStalls = stalls.filter(s => s.status === 'available').length;
  const pendingRequests = stallRequests.filter(r => r.status === 'pending');

  const hallStats = [
    { hall: "Hall A", occupied: 22, available: 8 },
    { hall: "Hall B", occupied: 19, available: 11 },
    { hall: "Hall C", occupied: 14, available: 11 },
  ];

  const occupancyRatio = [
    { name: "Occupied Stalls", value: occupiedStalls, color: "#2563eb" },
    { name: "Available Stalls", value: availableStalls, color: "#10b981" },
    { name: "Pending Approval", value: pendingRequests.length, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Trade Organizer Control Center
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
              MITE Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Oversee multi-hall allocations, review exhibitor booth requests, and track B2B appointments.
          </p>
        </div>

        <Link
          to="/organizer/exhibitions/create"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Exhibition</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Stalls</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{stalls.length}</p>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Across 3 Main Halls</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Occupancy Rate</span>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {Math.round((occupiedStalls / (stalls.length || 1)) * 100)}%
          </p>
          <span className="text-[10px] text-slate-500 font-bold block mt-1">{occupiedStalls} confirmed booths</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Requests</span>
          <p className="text-2xl font-black text-amber-500 mt-1">{pendingRequests.length}</p>
          <span className="text-[10px] text-amber-600 font-bold block mt-1">Awaiting approval</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">B2B Appointments</span>
          <p className="text-2xl font-black text-purple-600 mt-1">{appointments.length}</p>
          <span className="text-[10px] text-purple-600 font-bold block mt-1">Facilitated via AI</span>
        </div>
      </div>

      {/* Pending Stall Requests Approval Card (Crucial Prompt Workflow) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900">
                Pending Stall Allocation Requests
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black text-[10px]">
                {pendingRequests.length} ACTION REQUIRED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review exhibitor applications and confirm floor positions.
            </p>
          </div>

          <Link to="/organizer/stall-requests" className="text-xs font-bold text-blue-600 hover:text-blue-800">
            View All Requests
          </Link>
        </div>

        {pendingRequests.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {pendingRequests.map(req => (
              <div key={req.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm text-slate-900">{req.company_name}</h4>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-black text-xs">
                      Stall {req.stall_number}
                    </span>
                    <span className="text-slate-400">Hall {req.hall_code}</span>
                  </div>
                  <p className="text-slate-500">{req.notes}</p>
                  <span className="text-[10px] text-slate-400">
                    Requested on {new Date(req.requested_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => approveStallRequest(req.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Stall</span>
                  </button>
                  <button
                    onClick={() => rejectStallRequest(req.id)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-bold text-xs transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No pending stall requests at this moment.
          </div>
        )}
      </div>

      {/* Hall Occupancy & Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              Stall Occupancy per Exhibition Hall
            </h3>
            <span className="text-xs text-slate-400">Manufacturing Expo Mumbai</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hallStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hall" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="occupied" name="Occupied Stalls" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="available" name="Available Stalls" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4 flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Total Floor Distribution
          </h3>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyRatio}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {occupancyRatio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {occupancyRatio.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="font-bold text-slate-900">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
