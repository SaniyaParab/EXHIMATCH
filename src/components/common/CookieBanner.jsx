import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_STORAGE_KEY = 'exhilink_cookie_consent_v1';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Show banner after brief delay
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error("Cookie storage check failed:", e);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: false,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: analyticsConsent,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setPreferencesOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 animate-in slide-in-from-bottom-6 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl border border-slate-700/80 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">We value your privacy</h4>
              <p className="text-[11px] text-slate-300">
                ExhiLink AI uses cookies to enhance platform navigation and analyze trade exhibition traffic.
              </p>
            </div>
          </div>
          <button 
            onClick={handleRejectNonEssential}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {preferencesOpen && (
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2 text-xs text-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold block">Essential Session Cookies</span>
                <span className="text-[10px] text-slate-400">Required for login & Supabase profile state</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">Always Active</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
              <div>
                <span className="font-bold block">Analytics & Performance</span>
                <span className="text-[10px] text-slate-400">Allows tracking exhibition search trends</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <Link to="/cookies" className="text-[10px] text-slate-400 hover:text-white underline">
            Cookie Policy
          </Link>

          <div className="flex gap-2">
            {!preferencesOpen ? (
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] rounded-xl border border-slate-700"
              >
                Manage Preferences
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-xl"
              >
                Save Preferences
              </button>
            )}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-xl shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
