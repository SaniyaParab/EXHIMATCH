import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Mail, Phone, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ExhiMatch<span className="text-purple-400">AI</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              "Find the Right Exhibition. Find the Right Supplier."
              <br />
              AI-powered B2B product discovery and exhibition matching platform engineered for industrial buyers, machinery makers, and exhibition organizers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-500">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] font-bold text-slate-300 border border-slate-700">
                OpsGenie AI Hackathon Track
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ISO 27001 & B2B Verified
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/exhibitions" className="hover:text-white transition-colors">Browse Exhibitions</Link></li>
              <li><Link to="/buyer/discover" className="hover:text-white transition-colors">AI Supplier Finder</Link></li>
              <li><Link to="/buyer/results" className="hover:text-white transition-colors">Live Match Results</Link></li>
              <li><Link to="/buyer/map/exh-1" className="hover:text-white transition-colors">Interactive Floor Map</Link></li>
            </ul>
          </div>

          {/* Solutions by Role */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/buyer/dashboard" className="hover:text-white transition-colors">For B2B Buyers</Link></li>
              <li><Link to="/exhibitor/dashboard" className="hover:text-white transition-colors">For Exhibitors</Link></li>
              <li><Link to="/organizer/dashboard" className="hover:text-white transition-colors">For Trade Organizers</Link></li>
              <li><Link to="/exhibitor/leads" className="hover:text-white transition-colors">Qualified Lead CRM</Link></li>
              <li><Link to="/organizer/stalls" className="hover:text-white transition-colors">Floor Plan & Stall Allocation</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>BKC Innovation Hub, Mumbai, MH</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>support@exhimatch.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 22 4910 8800</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} ExhiMatch AI Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#security" className="hover:text-slate-400">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
