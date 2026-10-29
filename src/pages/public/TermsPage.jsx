import React from 'react';
import { FileText, Shield } from 'lucide-react';

/*
  INTERNAL LEGAL NOTICE:
  Terms of Service document for B2B user behavior, exhibitor listings, stall allocations, and trade appointment bookings.
  IMPORTANT: Must be reviewed by legal counsel before commercial release.
*/

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-slate-700">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-[11px] font-semibold flex items-center gap-2">
        <Shield className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Internal Note:</strong> Terms of Service draft. Have legal counsel review before production launch.
        </span>
      </div>

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 text-xs mt-1">Effective Date: September 28, 2026 • ExhiLink AI</p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using ExhiLink AI, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may not use the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. User Roles & Accounts</h2>
          <p className="leading-relaxed">
            Users may register under one of three roles: Buyer, Exhibitor, or Organizer. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your profile.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Exhibitor & Product Listings</h2>
          <p className="leading-relaxed">
            Exhibitors must provide accurate company descriptions, technical specifications, and stall availability requests. Misrepresentation of manufacturing origin or equipment specifications is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">4. Stall Allocations & Trade Appointments</h2>
          <p className="leading-relaxed">
            Stall allocation approvals are governed by trade exhibition organizers. Appointment bookings scheduled on ExhiLink AI create pre-qualified B2B lead records for exhibitors.
          </p>
        </section>
      </div>
    </div>
  );
}
