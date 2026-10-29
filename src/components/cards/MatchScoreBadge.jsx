import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';

export default function MatchScoreBadge({ score, matchDetails, size = "md", showBreakdown = true }) {
  const [isOpen, setIsOpen] = useState(false);

  const getScoreColor = (val) => {
    if (val >= 90) return 'from-emerald-500 to-teal-600 text-emerald-950 border-emerald-200 bg-emerald-50';
    if (val >= 80) return 'from-blue-600 to-indigo-600 text-blue-950 border-blue-200 bg-blue-50';
    if (val >= 70) return 'from-amber-500 to-orange-600 text-amber-950 border-amber-200 bg-amber-50';
    return 'from-slate-600 to-slate-800 text-slate-900 border-slate-200 bg-slate-50';
  };

  const getBadgeStyle = (val) => {
    if (val >= 90) return 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20';
    if (val >= 80) return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20';
    if (val >= 70) return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/20';
    return 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-slate-500/20';
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-semibold",
    md: "px-2.5 py-1 text-xs font-bold",
    lg: "px-3.5 py-1.5 text-sm font-extrabold"
  };

  return (
    <div className="relative inline-block">
      <div 
        onClick={(e) => {
          if (showBreakdown && matchDetails) {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }
        }}
        className={`inline-flex items-center gap-1.5 rounded-full shadow-sm ${getBadgeStyle(score)} ${sizeClasses[size]} ${showBreakdown && matchDetails ? 'cursor-pointer hover:opacity-95 transition-transform active:scale-95' : ''}`}
        title="AI Match Score"
      >
        <Sparkles className={size === "lg" ? "w-4 h-4 text-yellow-300 animate-pulse" : "w-3 h-3 text-yellow-300"} />
        <span>{score}% Match</span>
        {showBreakdown && matchDetails && (
          <Info className="w-3 h-3 opacity-80 hover:opacity-100 ml-0.5" />
        )}
      </div>

      {/* Breakdown Popover */}
      {isOpen && matchDetails && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }} 
          />
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 mt-2 w-80 p-4 bg-white rounded-2xl shadow-2xl border border-slate-200 -right-2 top-full text-slate-800 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${getBadgeStyle(score)}`}>
                  {score}%
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">AI Match Breakdown</h4>
                  <p className="text-[10px] text-slate-500">6-Factor Weighted Algorithm</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
              >
                ✕
              </button>
            </div>

            {/* Factor meters */}
            <div className="space-y-2 my-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-600">Product Relevance (40%)</span>
                  <span className="font-bold text-blue-600">{matchDetails.productMatch || score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${matchDetails.productMatch || score}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-600">Budget Compatibility (20%)</span>
                  <span className="font-bold text-emerald-600">{matchDetails.budgetMatch || 90}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${matchDetails.budgetMatch || 90}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-600">Location Proximity (15%)</span>
                  <span className="font-bold text-indigo-600">{matchDetails.locationMatch || 95}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${matchDetails.locationMatch || 95}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-600">Exhibition Date & Schedule (10%)</span>
                  <span className="font-bold text-purple-600">{matchDetails.dateMatch || 90}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${matchDetails.dateMatch || 90}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-slate-600">Supplier Credibility & Stall (10%)</span>
                  <span className="font-bold text-teal-600">{matchDetails.availabilityMatch || 100}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${matchDetails.availabilityMatch || 100}%` }} />
                </div>
              </div>
            </div>

            {/* Reasons */}
            {matchDetails.reasons && matchDetails.reasons.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Why this is recommended:
                </span>
                <div className="space-y-1">
                  {matchDetails.reasons.slice(0, 4).map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{reason.replace(/^✓\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
