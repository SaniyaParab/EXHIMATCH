import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, Shield, Building2, Zap, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function DemoScenarioBanner() {
  const { currentRole, switchDemoRole, currentUser } = useAuth();
  const { resetToDemoDefaults, executeAIMatching } = useData();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const runDemoFlow = async () => {
    // Switch to Buyer
    switchDemoRole('buyer');
    await executeAIMatching({
      product_name: "CNC Laser Cutting Machine",
      category: "Industrial Machinery",
      budget_min: 2000000,
      budget_max: 3000000,
      location: "Mumbai",
      max_distance: 200,
      preferred_date: "2026-11-13",
      additional_notes: "Suitable for metal sheet cutting with fast piercing speeds"
    });
    navigate('/buyer/results');
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hackathon Badge & Scenario Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-[10px] uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            Hackathon Track: OpsGenie AI
          </span>
          <span className="text-slate-300 hidden md:inline">
            Official Demo: <strong className="text-white">"CNC Laser Cutting Machine"</strong> (₹20-30L Mumbai) → <span className="text-purple-300">Stall A24 (96%)</span>
          </span>
          <button
            onClick={runDemoFlow}
            className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 transition-all active:scale-95 shadow-xs text-[11px]"
          >
            <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            1-Click Demo Flow
          </button>
        </div>

        {/* Right: Fast Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden sm:inline">Active Persona:</span>
          
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => {
                switchDemoRole('buyer');
                navigate('/buyer/dashboard');
              }}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-all flex items-center gap-1 ${
                currentRole === 'buyer' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              Buyer
            </button>

            <button
              onClick={() => {
                switchDemoRole('exhibitor');
                navigate('/exhibitor/dashboard');
              }}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-all flex items-center gap-1 ${
                currentRole === 'exhibitor' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3 h-3" />
              Exhibitor (ABC Machinery)
            </button>

            <button
              onClick={() => {
                switchDemoRole('organizer');
                navigate('/organizer/dashboard');
              }}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-all flex items-center gap-1 ${
                currentRole === 'organizer' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              Organizer
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1"
            title="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Workflow Overview */}
      {isExpanded && (
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 text-[11px] text-slate-300 animate-in fade-in duration-150">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 space-y-1">
              <span className="font-bold text-white block">Connected 3-Way Workflow:</span>
              <p className="text-slate-400 leading-relaxed">
                1. <strong>Buyer</strong> searches "CNC Laser Cutting Machine" → AI recommends <strong>Manufacturing Expo Mumbai</strong> (92%) & <strong>Stall A24 (ABC Machinery 96%)</strong> → Books appointment.
                <br />
                2. <strong>Exhibitor (ABC Machinery)</strong> instantly receives a <strong>Qualified Lead</strong> in their dashboard CRM with match score, budget, and booked slot.
                <br />
                3. <strong>Organizer</strong> manages live floor maps, approves stall requests, and oversees attendance & appointments.
              </p>
            </div>
            <button
              onClick={resetToDemoDefaults}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium shrink-0 border border-slate-700"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
