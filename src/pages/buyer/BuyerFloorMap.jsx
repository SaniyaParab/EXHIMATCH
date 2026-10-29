import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';
import BookingModal from '../../components/common/BookingModal';
import { ArrowLeft, Sparkles, Building2 } from 'lucide-react';

export default function BuyerFloorMap() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const highlightStall = searchParams.get('stall') || null;

  const { exhibitions, aiResults, products } = useData();

  const exhibitionId = id || "exh-1";
  const exhibition = exhibitions.find(e => e.id === exhibitionId) || exhibitions[0];

  const [bookingMatch, setBookingMatch] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBookFromMap = (meta) => {
    setBookingMatch({
      stall: meta.stall,
      exhibitor: meta.exhibitor,
      exhibition: exhibition,
      product: meta.products[0] || products[0],
      matchPercentage: meta.matchPercentage || 96,
      matchDetails: meta.matchDetails
    });
    setBookingOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/buyer/results" className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Results</span>
            </Link>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Interactive Floor Map: {exhibition.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {exhibition.venue} • Click any stall in Hall A, Hall B, or Hall C to inspect booth equipment & book live meetings.
          </p>
        </div>
      </div>

      {/* Embedded Floor Map */}
      <InteractiveFloorMap
        exhibitionId={exhibition.id}
        recommendedStalls={aiResults.topStalls}
        onBookAppointment={handleBookFromMap}
        highlightStallNumber={highlightStall}
      />

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
