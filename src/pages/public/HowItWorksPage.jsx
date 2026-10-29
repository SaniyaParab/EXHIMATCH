import React from 'react';
import { Sparkles, Search, Building2, Store, CalendarCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Buyer Enters Machinery Requirement",
      desc: "Specify your required machine (e.g. 'CNC Laser Cutting Machine'), category, budget range (e.g. ₹20-30 Lakhs), location (e.g. Mumbai), max travel distance (200 km), and any technical specs.",
      icon: Search,
      color: "bg-blue-100 text-blue-700"
    },
    {
      num: "02",
      title: "AI 6-Factor Algorithmic Matching",
      desc: "The engine runs a multi-parameter evaluation: Product Relevance (40%), Budget Compatibility (20%), Location Proximity (15%), Date Alignment (10%), Supplier Availability & Rating (10%), and Special Specs (5%).",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-700"
    },
    {
      num: "03",
      title: "Exhibition & Exact Stall Discovery",
      desc: "Instead of just suggesting a trade fair, ExhiMatch AI pinpoints the exact booth numbers (e.g. Stall A24 - ABC Machinery with 96% Match, Stall B17 with 91% Match) on an interactive floor map.",
      icon: Store,
      color: "bg-amber-100 text-amber-700"
    },
    {
      num: "04",
      title: "Instant Booth Appointment Booking",
      desc: "Select a date and 1-hour demo slot. Generate a confirmed booking token (e.g. EXH-2026-00124) guaranteeing machine availability and dedicated sales engineering staff.",
      icon: CalendarCheck,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      num: "05",
      title: "Automatic Qualified Lead Generation",
      desc: "The booking automatically pushes an enriched lead into the exhibitor's CRM dashboard with high-affinity intent data, budget parameters, and notes.",
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-700"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs uppercase tracking-wider border border-blue-200">
          Step-by-Step Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How ExhiMatch AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From product requirement to physical booth testing and closed enterprise deals.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div 
              key={idx}
              className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="flex sm:flex-col items-center gap-3 shrink-0">
                <span className="font-mono text-2xl font-black text-slate-300">{st.num}</span>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold ${st.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-extrabold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Try Flow CTA */}
      <div className="text-center pt-6">
        <Link
          to="/buyer/discover"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/20 transition-all"
        >
          <span>Experience the Flow (Find Suppliers)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
