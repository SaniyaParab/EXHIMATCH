import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

/*
  INTERNAL LEGAL NOTICE:
  This document provides standard boilerplate text for B2B platform user accounts, profile information, company details, appointments, Supabase storage, analytics, and cookies.
  IMPORTANT: This legal text must be reviewed by qualified legal counsel prior to commercial production deployment.
*/

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-slate-700">
      {/* Internal Code Disclaimer Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-[11px] font-semibold flex items-center gap-2">
        <Shield className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Internal Note:</strong> This privacy policy covers user accounts, profile data, Supabase storage, and appointments. Please have legal counsel review prior to production launch.
        </span>
      </div>

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 text-xs mt-1">Last updated: September 28, 2026 • ExhiLink AI</p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Information We Collect</h2>
          <p className="leading-relaxed">
            ExhiLink AI collects information necessary to provide B2B exhibition matching and appointment booking services. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>User account credentials (email address, full name, phone number)</li>
            <li>Profile & company details (company name, business category, designated job role, city, state, website)</li>
            <li>Procurement preferences (target machinery specs, budget parameters, travel distance radius)</li>
            <li>Appointment bookings and stall allocation requests</li>
            <li>Media files uploaded to Supabase Storage (avatars, company logos, product images)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use collected data solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Power our 6-Factor AI matching algorithm to recommend exhibitions, suppliers, and stalls</li>
            <li>Facilitate trade appointments between buyers and exhibitors</li>
            <li>Generate qualified CRM lead profiles for exhibitor companies</li>
            <li>Provide notifications regarding stall approvals and scheduled trade meetings</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Data Storage & Security (Supabase RLS)</h2>
          <p className="leading-relaxed">
            All user data is stored securely in PostgreSQL databases hosted via Supabase, protected with Row Level Security (RLS) policies. Access keys are strictly restricted to public anon keys on frontend applications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">4. Analytics & Cookies</h2>
          <p className="leading-relaxed">
            We use essential cookies to maintain user authentication sessions. Optional analytics cookies help us monitor aggregate exhibition search trends. You may update your cookie preferences at any time via the cookie banner or settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">5. Contact Us</h2>
          <p className="leading-relaxed">
            For privacy inquiries or data deletion requests, contact our Data Protection Officer at privacy@exhilink.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
