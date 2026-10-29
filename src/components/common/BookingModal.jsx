import React, { useState } from 'react';
import { Calendar, Clock, Store, Building2, CheckCircle2, Sparkles, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import confetti from 'canvas-confetti';
import MatchScoreBadge from '../cards/MatchScoreBadge';
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ isOpen, onClose, targetMatch }) {
  const { currentUser } = useAuth();
  const { bookAppointment } = useData();
  const navigate = useNavigate();

  const [date, setDate] = useState("2026-11-13");
  const [timeSlot, setTimeSlot] = useState("11:30 AM");
  const [purpose, setPurpose] = useState("Live cutting speed & edge quality demonstration on sheet metal");
  const [notes, setNotes] = useState("We plan to procure a 6kW fiber laser in Q1. Need technical quotation & installation timeline.");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !targetMatch) return null;

  const { stall, exhibitor, exhibition, product, matchPercentage, matchDetails } = targetMatch;

  const availableSlots = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:15 PM"
  ];

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Call data context to book appointment & create qualified lead
    const result = bookAppointment({
      buyer: currentUser || {
        id: "prof-buyer-1",
        full_name: "Rajesh Sharma",
        company_name: "Sharma Precision Fab Pvt Ltd",
        email: "rajesh@sharmaindustries.com",
        phone: "+91 98201 44552",
        city: "Mumbai",
        state: "Maharashtra"
      },
      exhibitorId: exhibitor?.id || "exh-comp-1",
      exhibitionId: exhibition?.id || "exh-1",
      stallId: stall?.id || "stall-A-A24",
      productId: product?.id || "prod-1",
      date,
      timeSlot,
      purpose,
      notes,
      matchPercentage: matchPercentage || 96
    });

    setIsSubmitting(false);
    setConfirmedBooking(result);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Schedule B2B Trade Meeting</h3>
              <p className="text-xs text-blue-100">Direct Stall Appointment & Live Equipment Demo</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {confirmedBooking ? (
          /* Confirmation State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono font-black text-xs inline-block mb-2">
                Booking ID: {confirmedBooking.bookingId}
              </span>
              <h4 className="text-lg font-black text-slate-900">
                Appointment Successfully Confirmed!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Your meeting with <strong>{exhibitor?.company_name}</strong> has been registered for <strong>{date}</strong> at <strong>{timeSlot}</strong> at <strong>Stall {stall?.stall_number}</strong>.
              </p>
            </div>

            {/* Qualified Lead Notification Note */}
            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200 text-left text-xs space-y-1">
              <span className="font-bold text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Qualified Lead Created for Exhibitor
              </span>
              <p className="text-[11px] text-purple-800 leading-normal">
                This inquiry and requirement have been automatically synced to ABC Machinery's CRM lead pipeline with your 96% Match score.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  handleClose();
                  navigate('/buyer/appointments');
                }}
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
              >
                View My Appointments
              </button>

              <button
                onClick={() => {
                  handleClose();
                  navigate(`/buyer/map/${exhibition?.id || 'exh-1'}`);
                }}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors"
              >
                View Stall on Map
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleConfirm} className="p-5 sm:p-6 space-y-4 text-xs">
            {/* Target Exhibitor & Stall Banner */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={exhibitor?.logo_url} 
                  alt={exhibitor?.company_name} 
                  className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200" 
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{exhibitor?.company_name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Store className="w-3 h-3 text-purple-600" />
                    Stall {stall?.stall_number} (Hall {stall?.hall_code}) • {exhibition?.name}
                  </p>
                </div>
              </div>
              <MatchScoreBadge score={matchPercentage || 96} size="md" />
            </div>

            {/* Date Selection */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Select Preferred Date</label>
              <div className="grid grid-cols-3 gap-2">
                {["2026-11-13", "2026-11-14", "2026-11-15"].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDate(d)}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all ${
                      date === d 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {d.slice(5)} (Day {d.slice(-1) === '3' ? '1' : d.slice(-1) === '4' ? '2' : '3'})
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Select Available Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl border text-center font-bold transition-all ${
                      timeSlot === slot 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Agenda / Purpose */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Meeting Agenda</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Procurement Notes */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Procurement Notes / Specs</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <span>Securing Booking Slot...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Stall Appointment & Live Demo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
