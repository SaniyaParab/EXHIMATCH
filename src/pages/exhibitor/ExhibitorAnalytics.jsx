import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  CalendarCheck, 
  Users, 
  DollarSign, 
  Store 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

export default function ExhibitorAnalytics() {
  const visitorData = [
    { hour: "10 AM", visitors: 45, demos: 8 },
    { hour: "11 AM", visitors: 95, demos: 19 },
    { hour: "12 PM", visitors: 140, demos: 28 },
    { hour: "01 PM", visitors: 80, demos: 12 },
    { hour: "02 PM", visitors: 110, demos: 22 },
    { hour: "03 PM", visitors: 160, demos: 35 },
    { hour: "04 PM", visitors: 130, demos: 26 },
    { hour: "05 PM", visitors: 70, demos: 14 }
  ];

  const pipelineStages = [
    { stage: "Matched Buyers", count: 184, fill: "#3b82f6" },
    { stage: "Profile Viewed", count: 96, fill: "#6366f1" },
    { stage: "Demo Booked", count: 42, fill: "#8b5cf6" },
    { stage: "In Negotiation", count: 18, fill: "#d946ef" },
    { stage: "PO / Closed", count: 7, fill: "#10b981" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Exhibitor Analytics & Commercial ROI
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Measure stall footfall, conversion pipeline, and machine interest across exhibition cycles.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Pipeline Value</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹4.85 Crore</p>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Across 18 high intent buyers</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Meeting Conversion Rate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">43.8%</p>
          <span className="text-[10px] text-blue-600 font-bold block mt-1">From matched inquiry to demo</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Avg Match Affinity</span>
          <p className="text-2xl font-black text-slate-900 mt-1">94.2%</p>
          <span className="text-[10px] text-purple-600 font-bold block mt-1">Stall-level AI precision</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Booked Time</span>
          <p className="text-2xl font-black text-slate-900 mt-1">26 Hours</p>
          <span className="text-[10px] text-amber-600 font-bold block mt-1">Over 3-day exhibition</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Traffic */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            Projected Stall Footfall vs. Live Demonstrations (Per Hour)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke="#2563eb" fill="#dbeafe" />
                <Area type="monotone" dataKey="demos" stroke="#7e22ce" fill="#f3e8ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Pipeline */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            B2B Buyer Conversion Pipeline (Match to Deal)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineStages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={11} width={95} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {pipelineStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
