import React from 'react';
import { Cookie, Shield } from 'lucide-react';

/*
  INTERNAL LEGAL NOTICE:
  Cookie Policy document explaining essential session tokens and analytics tracking.
  IMPORTANT: Review before production.
*/

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-slate-700">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cookie Policy</h1>
        <p className="text-slate-500 text-xs mt-1">Effective Date: September 28, 2026 • ExhiLink AI</p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. What Are Cookies?</h2>
          <p className="leading-relaxed">
            Cookies are small text files placed on your device to store preferences and maintain security sessions while navigating ExhiLink AI.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Essential Session Cookies:</strong> Required to maintain login authentication and Supabase database context.</li>
            <li><strong>Local Storage State:</strong> Used to preserve offline mock demo state, profile image data, and user preferences.</li>
            <li><strong>Analytics Cookies:</strong> Optional cookies used to aggregate search query trends.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Managing Preferences</h2>
          <p className="leading-relaxed">
            You can change your consent preferences at any time using our Cookie Consent Banner or through your web browser settings.
          </p>
        </section>
      </div>
    </div>
  );
}
