import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Store, Building2, ArrowLeft, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';
import BookingModal from '../../components/common/BookingModal';
import ExhibitorCard from '../../components/cards/ExhibitorCard';

export default function PublicExhibitionDetailsPage() {
  const { id } = useParams();
  const { exhibitions, exhibitors, stalls, products, aiResults } = useData();

  const exhibitionId = id || "exh-1";
  const exhibition = exhibitions.find(e => e.id === exhibitionId) || exhibitions[0];

  const [bookingMatch, setBookingMatch] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Stalls in this exhibition
  const exhStalls = stalls.filter(s => s.exhibition_id === exhibition.id);
  const occupiedStallExhibitorIds = exhStalls.filter(s => s.current_exhibitor_id).map(s => s.current_exhibitor_id);
  const participatingExhibitors = exhibitors.filter(e => occupiedStallExhibitorIds.includes(e.id));

  const handleBookFromMap = (meta) => {
    setBookingMatch({
      stall: meta.stall,
      exhibitor: meta.exhibitor,
      exhibition: exhibition,
      product: meta.products[0] || products[0],
      matchPercentage: meta.matchPercentage || 92
    });
    setBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link 
          to="/exhibitions" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Exhibitions</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[320px] flex flex-col justify-end p-6 sm:p-10 shadow-2xl">
        <img 
          src={exhibition.banner_image} 
          alt={exhibition.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
              {exhibition.status.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white">
              {exhibition.total_halls} Halls • {exhibition.total_stalls}+ Stalls
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {exhibition.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {exhibition.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1.5 font-semibold">
              <Calendar className="w-4 h-4 text-blue-400" />
              {exhibition.start_date} to {exhibition.end_date}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-blue-400" />
              {exhibition.venue}, {exhibition.city}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Users className="w-4 h-4 text-blue-400" />
              {exhibition.exhibitor_count} Verified Exhibitors
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Floor Map Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Exhibition Floor Map & Stall Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any stall in Hall A, Hall B, or Hall C to inspect the company, machinery displays, and book appointments.
          </p>
        </div>

        <InteractiveFloorMap
          exhibitionId={exhibition.id}
          recommendedStalls={aiResults.topStalls}
          onBookAppointment={handleBookFromMap}
        />
      </div>

      {/* Featured Exhibitors at this Show */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Featured Exhibitors at this Show
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top machinery and engineering companies with confirmed stalls.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(participatingExhibitors.length > 0 ? participatingExhibitors : exhibitors.slice(0, 6)).map(exhibitor => (
            <ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
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
