import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Map, Store, Calendar, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star, Building2, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import MatchScoreBadge from '../../components/cards/MatchScoreBadge';
import StallCard from '../../components/cards/StallCard';
import ExhibitionCard from '../../components/cards/ExhibitionCard';
import BookingModal from '../../components/common/BookingModal';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';

export default function BuyerResults() {
  const { aiResults, buyerRequirement } = useData();
  const navigate = useNavigate();

  const [bookingMatch, setBookingMatch] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const topExh = aiResults.recommendedExhibitions[0];

  const handleBook = (match) => {
    setBookingMatch(match);
    setBookingOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Bar with Requirement summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
              AI Match Results
            </span>
            <span className="text-xs text-slate-500">
              Computed for: <strong className="text-slate-900">"{buyerRequirement.product_name}"</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Top Recommended Exhibitions & Stalls
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/buyer/discover"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
          >
            Refine Search
          </Link>
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Map className="w-3.5 h-3.5" />
            <span>{showMap ? "Hide Floor Map" : "View Live Floor Map"}</span>
          </button>
        </div>
      </div>

      {/* Top Exhibition Highlight Banner */}
      {topExh && (
        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[11px] font-black uppercase tracking-wider">
                  Top Recommended Exhibition
                </span>
                <MatchScoreBadge score={topExh.matchPercentage || 92} size="md" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                {topExh.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {topExh.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  {topExh.start_date} to {topExh.end_date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {topExh.venue}, {topExh.city} ({topExh.distance_km || 62} km away)
                </span>
                <span className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-purple-400" />
                  {aiResults.topStalls.length} Highly Matched Stalls
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
              <Link
                to={`/buyer/map/${topExh.id}`}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                <span>Open Interactive Map</span>
              </Link>

              <Link
                to={`/buyer/exhibition/${topExh.id}`}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors text-center"
              >
                View Full Exhibition Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Floor Map Collapse */}
      {showMap && (
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">
              Floor Plan: Bombay Exhibition Centre (Hall A, B, C)
            </h3>
            <span className="text-xs text-purple-600 font-bold">
              ⭐ Highlighted: Top Matched Stalls
            </span>
          </div>

          <InteractiveFloorMap
            exhibitionId={topExh?.id || "exh-1"}
            recommendedStalls={aiResults.topStalls}
            onBookAppointment={(meta) => {
              setBookingMatch({
                stall: meta.stall,
                exhibitor: meta.exhibitor,
                exhibition: topExh,
                product: meta.products[0],
                matchPercentage: meta.matchPercentage || 96
              });
              setBookingOpen(true);
            }}
          />
        </div>
      )}

      {/* Top 3-5 Stalls Grid (The Main Differentiating Feature) */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Top Stalls For You
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {aiResults.topStalls.length} HIGH-AFFINITY BOOTHS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by product fit, budget compatibility, verified stall allocation, and supplier rating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiResults.topStalls.map((match, idx) => (
            <StallCard
              key={idx}
              match={match}
              onBookAppointment={handleBook}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingMatch && (
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          targetMatch={bookingMatch}
        />
      )}
    </div>
  );
}
