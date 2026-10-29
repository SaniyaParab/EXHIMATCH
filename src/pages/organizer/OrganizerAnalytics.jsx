import React from 'react';
import { BarChart3, Users, Building2, Store, DollarSign, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function OrganizerAnalytics() {
  const visitorGrowth = [
    { month: "Jan", visitors: 4200, bookings: 120 },
    { month: "Feb", visitors: 6800, bookings: 210 },
    { month: "Mar", visitors: 9500, bookings: 340 },
    { month: "Apr", visitors: 13200, bookings: 490 },
    { month: "May", visitors: 18400, bookings: 680 },
    { month: "Jun", visitors: 24500, bookings: 920 },
  ];

  const categoryShare = [
    { name: "Machinery & Machine Tools", count: 42, color: "#2563eb" },
    { name: "Robotics & Automation", count: 28, color: "#7c3aed" },
    { name: "Tooling & Fabrication", count: 20, color: "#059669" },
    { name: "Packaging Tech", count: 15, color: "#d97706" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Exhibition Performance & Traffic Analytics
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Macro metrics across all halls, exhibitor revenue, and B2B engagement.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Registered Trade Buyers</span>
          <p className="text-2xl font-black text-slate-900 mt-1">24,500+</p>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">From 480 industrial clusters</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Stalls Booked</span>
          <p className="text-2xl font-black text-blue-600 mt-1">92.4%</p>
          <span className="text-[10px] text-slate-500 font-bold block mt-1">74 out of 80 allocated</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Booth Revenue</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹1.42 Cr</p>
          <span className="text-[10px] text-purple-600 font-bold block mt-1">Direct stall booking receipts</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Facilitated Meetings</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">840+</p>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">AI-scheduled sessions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">
            Monthly Buyer Registrations & Booth Appointments
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke="#2563eb" fill="#dbeafe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4 flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Stall Allocations by Sector
          </h3>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-xs">
            {categoryShare.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="font-bold text-slate-900">{c.count} stalls</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
