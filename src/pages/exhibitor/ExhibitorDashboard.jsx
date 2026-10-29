import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Store, 
  CalendarCheck, 
  TrendingUp, 
  Eye, 
  Sparkles, 
  Inbox, 
  Package, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail
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
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import LeadCard from '../../components/cards/LeadCard';
import AppointmentCard from '../../components/cards/AppointmentCard';

import ExhibitorOnboardingProgress from '../../components/common/ExhibitorOnboardingProgress';

export default function ExhibitorDashboard() {
  const { currentUser } = useAuth();
  const { leads, appointments, products, stalls, exhibitions } = useData();

  // Exhibitor's assigned stall (Stall A24 for ABC Machinery)
  const myStall = stalls.find(s => s.stall_number === "A24" && s.current_exhibitor_id === "exh-comp-1") || stalls[0];
  const myExhibition = exhibitions.find(e => e.id === myStall?.exhibition_id) || exhibitions[0];

  // Filter leads & appointments for ABC Machinery
  const myLeads = leads.filter(l => l.exhibitor_id === "exh-comp-1" || l.stall_id === myStall?.id);
  const myAppointments = appointments.filter(a => a.exhibitor_id === "exh-comp-1" || a.stall_id === myStall?.id);
  const myProducts = products.filter(p => p.exhibitor_id === "exh-comp-1");

  // Analytics mock datasets
  const leadsOverTime = [
    { day: "Day 1", leads: 4, views: 35 },
    { day: "Day 2", leads: 7, views: 58 },
    { day: "Day 3", leads: 12, views: 92 },
    { day: "Day 4", leads: 18, views: 145 },
    { day: "Day 5", leads: 26, views: 210 },
    { day: "Day 6", leads: 34, views: 290 },
    { day: "Day 7", leads: 42, views: 380 },
  ];

  const productInterest = [
    { name: "Fiber Laser 6kW", inquiries: 45 },
    { name: "Press Brake 160T", inquiries: 28 },
    { name: "Tube Laser Cutter", inquiries: 34 },
    { name: "Laser Cleaning", inquiries: 16 },
  ];

  const buyerCategories = [
    { name: "Automotive Stamping", value: 40, color: "#2563eb" },
    { name: "Sheet Metal Fab", value: 35, color: "#9333ea" },
    { name: "Electrical Enclosures", value: 15, color: "#059669" },
    { name: "Heavy Engineering", value: 10, color: "#d97706" },
  ];

  return (
    <div className="space-y-8">
      {/* 0. 6-Step Onboarding Progress Indicator */}
      <ExhibitorOnboardingProgress currentStep={6} />

      {/* 1. Header & Live Stall Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Good morning, {currentUser?.company_name || "ABC Machinery"}
            </h2>
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" title="Verified OEM" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manufacturing Expo Mumbai • Hall A • Stall A24
          </p>
        </div>

        {/* Confirmed Stall Pill */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="px-3 py-1 bg-purple-100 text-purple-900 rounded-xl font-black text-xs flex items-center gap-1.5">
            <Store className="w-4 h-4 text-purple-700" />
            STALL A24 • Hall A
          </div>
          <span className="text-xs text-emerald-700 font-bold px-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed
          </span>
          <Link
            to="/exhibitor/stall"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 pr-2"
          >
            Manage Stall →
          </Link>
        </div>
      </div>

      {/* 2. Top Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Profile Views</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">1,420</p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 24% this week</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product Views</span>
            <Package className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">3,890</p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">↑ 38% laser inquiries</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">184</p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">From 62 cities</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Appointments</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myAppointments.length}</p>
          <span className="text-[10px] text-blue-600 font-bold mt-1 block">Live booth slots</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Qualified Leads</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myLeads.length}</p>
          <span className="text-[10px] text-purple-600 font-bold mt-1 block">Average Match: 94%</span>
        </div>
      </div>

      {/* 3. Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads over Time Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Qualified Leads & Booth Traffic Growth
              </h3>
              <p className="text-xs text-slate-400">Daily high-intent buyer inquiries leading to exhibition</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Live Campaign
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsOverTime}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="#2563eb" fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buyer Categories Breakdown Pie */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              Buyer Industry Profiles
            </h3>
            <p className="text-xs text-slate-400">Breakdown of matching buyers</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={buyerCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {buyerCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {buyerCategories.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Connected Qualified Leads CRM Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                New Qualified Leads (CRM)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">
                {myLeads.length} ACTIVE LEADS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Buyers matched with CNC laser cutters and press brakes with high commercial intent.
            </p>
          </div>

          <Link
            to="/exhibitor/leads"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Open Full CRM Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLeads.slice(0, 3).map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>

      {/* 5. Upcoming Booth Appointments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Upcoming Booth Appointments at Stall A24
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled demonstrations for Manufacturing Expo Mumbai 2026.
            </p>
          </div>

          <Link
            to="/exhibitor/appointments"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myAppointments.map(app => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
      </div>
    </div>
  );
}
