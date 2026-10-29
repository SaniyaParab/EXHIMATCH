import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Store, Calendar, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import MatchScoreBadge from './MatchScoreBadge';

export default function StallCard({ match, onBookAppointment }) {
  const { stall, exhibitor, exhibition, product, matchPercentage, matchDetails } = match;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      {/* Top Banner / Stall Badge */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-purple-50/40 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img 
            src={exhibitor?.logo_url || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&fit=crop&q=80"} 
            alt={exhibitor?.company_name} 
            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white p-0.5 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                {exhibitor?.company_name}
              </h3>
              {exhibitor?.verified && (
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" title="Verified Exhibitor" />
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {exhibitor?.rating || 4.8}
              </span>
              <span>({exhibitor?.review_count || 120} reviews)</span>
              <span>•</span>
              <span className="truncate">{exhibitor?.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <MatchScoreBadge score={matchPercentage} matchDetails={matchDetails} size="lg" />
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[11px] font-black tracking-wide border border-purple-200 flex items-center gap-1">
            <Store className="w-3 h-3 text-purple-700" />
            STALL {stall?.stall_number}
          </span>
        </div>
      </div>

      {/* Product Highlight */}
      <div className="p-4 sm:p-5 space-y-3.5 flex-1">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Matching Product:
          </span>
          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
            {product?.name}
          </h4>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {product?.description}
          </p>
        </div>

        {/* Exhibition Details */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
          <div className="truncate mr-2">
            <span className="font-bold text-slate-800 block truncate">{exhibition?.name}</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              Hall {stall?.hall_code} • {exhibition?.city} ({exhibition?.distance_km || 62} km)
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-600 shrink-0">
            {exhibition?.start_date}
          </span>
        </div>

        {/* Why this match matches */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Product Match ({product?.category})</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Budget Compatible (₹{(product?.price_min/100000).toFixed(0)}L - ₹{(product?.price_max/100000).toFixed(0)}L)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Stall Confirmed & Ready for Demo</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
        <Link
          to={`/buyer/exhibitor/${exhibitor?.id}`}
          className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
        >
          View Profile
        </Link>

        <button
          onClick={() => {
            if (onBookAppointment) onBookAppointment(match);
          }}
          className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs text-center transition-all shadow-sm shadow-blue-500/20 flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Appointment
        </button>
      </div>
    </div>
  );
}
