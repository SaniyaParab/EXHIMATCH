import React from 'react';
import { Sparkles, ShieldCheck, Target, Award, Users, Globe2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs uppercase tracking-wider border border-blue-200">
          About ExhiMatch AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Transforming B2B Industrial Sourcing with AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ExhiMatch AI was conceived to bridge the gap between heavy equipment buyers and genuine industrial manufacturers through precision exhibition and stall-level discovery.
        </p>
      </div>

      {/* Mission / Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminate friction, opaque brokers, and months of wasted travel in procurement by connecting buyers directly with live machinery demonstrations at local trade fairs.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">AI-First Matching</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our 6-factor weighted algorithm evaluates product specifications, budget overlap, travel distance, exhibitor track record, and verified booth stall occupancy.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Verified Quality</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every exhibitor is verified through trade licenses, hall allocation records, and audited buyer reviews, ensuring complete peace of mind.
          </p>
        </div>
      </div>

      {/* Hackathon Track Spotlight */}
      <div className="p-8 sm:p-10 bg-slate-900 text-white rounded-3xl space-y-4">
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider border border-purple-500/30">
          OpsGenie AI Hackathon Track
        </span>
        <h2 className="text-2xl font-black">
          Built for Scale & High-Precision B2B Trade
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          ExhiMatch AI integrates Supabase PostgreSQL for real-time relational integrity between buyers, exhibitors, stalls, appointments, and leads. Whether organizing a 1,000-booth international trade fair or procuring specialized 5-axis CNC machines, the platform delivers instant results.
        </p>
        <div className="pt-2">
          <Link
            to="/buyer/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <span>Try AI Product Matcher</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
