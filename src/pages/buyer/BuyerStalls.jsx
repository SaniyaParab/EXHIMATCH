import React, { useState } from 'react';
import { Store, Sparkles, Filter, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import StallCard from '../../components/cards/StallCard';
import BookingModal from '../../components/common/BookingModal';

export default function BuyerStalls() {
  const { aiResults } = useData();
  const [bookingMatch, setBookingMatch] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [minMatch, setMinMatch] = useState(80);

  const filteredStalls = aiResults.topStalls.filter(s => s.matchPercentage >= minMatch);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Recommended Stalls (Stall-Level AI Matching)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover the exact physical booth numbers where verified exhibitors are demonstrating your requested machinery.
          </p>
        </div>

        {/* Match filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Min Score:</span>
          <select
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
          >
            <option value={70}>70% + Match</option>
            <option value={80}>80% + Match</option>
            <option value={90}>90% + Match (Highest)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStalls.map((match, idx) => (
          <StallCard 
            key={idx} 
            match={match} 
            onBookAppointment={(m) => {
              setBookingMatch(m);
              setBookingOpen(true);
            }} 
          />
        ))}
      </div>

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
