import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  CalendarCheck,
  Bookmark,
  Users,
  Store,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import MatchScoreBadge from '../../components/cards/MatchScoreBadge';
import ExhibitionCard from '../../components/cards/ExhibitionCard';
import StallCard from '../../components/cards/StallCard';
import AppointmentCard from '../../components/cards/AppointmentCard';
import BookingModal from '../../components/common/BookingModal';

export default function BuyerDashboard() {
  const { currentUser } = useAuth();
  const { 
    exhibitions, 
    exhibitors, 
    stalls, 
    appointments, 
    savedExhibitions, 
    aiResults, 
    executeAIMatching,
    buyerRequirement 
  } = useData();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(buyerRequirement.product_name || "CNC Laser Cutting Machine");
  const [bookingMatch, setBookingMatch] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const upcomingAppointments = appointments.filter(a => a.status === 'confirmed');

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await executeAIMatching({
      product_name: searchInput,
      category: "Industrial Machinery",
      budget_min: 2000000,
      budget_max: 3000000,
      location: currentUser?.city || "Mumbai",
      max_distance: currentUser?.max_travel_distance || 200,
      preferred_date: "2026-11-13"
    });
    navigate('/buyer/results');
  };

  const handleBookAppointment = (match) => {
    setBookingMatch(match);
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header greeting & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Good morning, {currentUser?.full_name?.split(' ')[0] || "Rajesh"} 👋
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            What machinery or industrial supplier are you looking for today?
          </p>
        </div>

        <Link
          to="/buyer/discover"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold transition-colors w-fit"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Advanced AI Sourcing Form</span>
        </Link>
      </div>

      {/* 2. Large Search Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider inline-block">
            AI Product & Exhibition Discovery
          </span>

          <h3 className="text-xl sm:text-2xl font-black">
            What product are you looking for?
          </h3>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. CNC Laser Cutting Machine, Hydraulic Press, Packaging..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-black shadow-md transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Find My Matches</span>
            </button>
          </form>

          {/* Quick chip queries */}
          <div className="flex flex-wrap gap-2 text-[11px] text-blue-100 pt-1">
            <span>Try:</span>
            {["CNC Laser Cutting Machine", "Robotic Welding Cell", "Automatic Packaging Machine"].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchInput(chip)}
                className="hover:underline font-bold text-white"
              >
                "{chip}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Dashboard Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Saved Expos</span>
            <span className="text-xl font-black text-slate-900">{savedExhibitions.length}</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Demos</span>
            <span className="text-xl font-black text-slate-900">{upcomingAppointments.length}</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Matched Stalls</span>
            <span className="text-xl font-black text-slate-900">{aiResults.topStalls.length}+</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Inquiries</span>
            <span className="text-xl font-black text-slate-900">4</span>
          </div>
        </div>
      </div>

      {/* 4. Top Recommended Stalls (Main Differentiating Feature) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900">
                Top Stalls For You
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black">
                MATCHED FOR: "{buyerRequirement.product_name}"
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific booth recommendations with confirmed machine demonstrations.
            </p>
          </div>

          <Link
            to="/buyer/stalls"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Stalls</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiResults.topStalls.slice(0, 3).map((match, idx) => (
            <StallCard 
              key={idx} 
              match={match} 
              onBookAppointment={handleBookAppointment} 
            />
          ))}
        </div>
      </div>

      {/* 5. Recommended Exhibitions & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recommended Exhibitions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">
              Recommended Exhibitions
            </h3>
            <Link to="/buyer/exhibitions" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {aiResults.recommendedExhibitions.slice(0, 2).map(exh => (
              <ExhibitionCard 
                key={exh.id} 
                exhibition={exh} 
                matchScore={exh.matchPercentage}
                matchingStallsCount={exh.matchingStallsCount}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">
              Upcoming Appointments
            </h3>
            <Link to="/buyer/appointments" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.slice(0, 2).map(app => (
                <AppointmentCard key={app.id} appointment={app} />
              ))
            ) : (
              <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                No appointments booked yet. Click on any stall to book a live demo!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingMatch && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          targetMatch={bookingMatch}
        />
      )}
    </div>
  );
}
