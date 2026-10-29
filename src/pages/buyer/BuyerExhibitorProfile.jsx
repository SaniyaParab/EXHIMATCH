import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Globe2, 
  Calendar, 
  Store, 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Package 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/cards/ProductCard';
import BookingModal from '../../components/common/BookingModal';

export default function BuyerExhibitorProfile() {
  const { id } = useParams();
  const { exhibitors, products, stalls, exhibitions, reviews, addReview } = useData();
  const { currentUser } = useAuth();

  const exhibitorId = id || "exh-comp-1";
  const exhibitor = exhibitors.find(e => e.id === exhibitorId) || exhibitors[0];

  const exhibitorProducts = products.filter(p => p.exhibitor_id === exhibitor.id);
  const exhibitorStall = stalls.find(s => s.current_exhibitor_id === exhibitor.id);
  const exhibition = exhibitorStall ? exhibitions.find(ex => ex.id === exhibitorStall.exhibition_id) : exhibitions[0];
  const exhibitorReviews = reviews.filter(r => r.exhibitor_id === exhibitor.id);

  // Review submission state
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Booking modal
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    addReview({
      buyer: currentUser || { id: "prof-buyer-1", full_name: "Rajesh Sharma", company_name: "Sharma Precision Fab" },
      exhibitorId: exhibitor.id,
      rating,
      reviewText,
      exhibitionId: exhibition?.id
    });

    setReviewText("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link 
          to="/buyer/results" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Matches</span>
        </Link>
      </div>

      {/* Exhibitor Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-5">
            <img 
              src={exhibitor.logo_url} 
              alt={exhibitor.company_name} 
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 bg-white p-1 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {exhibitor.company_name}
                </h1>
                {exhibitor.verified && (
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" title="Verified OEM" />
                )}
              </div>

              <p className="text-xs text-slate-600 font-semibold">
                {exhibitor.business_category} • Est. {exhibitor.year_established || 2008}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 text-amber-600 font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  {exhibitor.rating} ({exhibitor.review_count} ratings)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {exhibitor.city}, {exhibitor.state}
                </span>
              </div>
            </div>
          </div>

          {/* Book Demo Button */}
          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            {exhibitorStall && (
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs border border-purple-200 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-purple-700" />
                STALL {exhibitorStall.stall_number} (Hall {exhibitorStall.hall_code})
              </span>
            )}

            <button
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Stall Appointment & Demo</span>
            </button>
          </div>
        </div>

        {/* Company Description */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-sm text-slate-900">About the Manufacturer</h4>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            {exhibitor.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-slate-700">{exhibitor.phone}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-700 truncate">{exhibitor.email}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-slate-700 truncate">{exhibitor.website}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Machinery Catalog at Exhibition */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Machinery & Equipment on Display
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Available for live testing and cutting speed evaluation at Stall {exhibitorStall?.stall_number || "A24"}.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600">
            {exhibitorProducts.length} Models Displayed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitorProducts.map(prod => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onSelect={() => setBookingOpen(true)}
            />
          ))}
        </div>
      </div>

      {/* Reviews & Ratings Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Buyer Reviews & Performance Ratings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited trade fair visitor feedback and machine quality ratings.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-amber-500 flex items-center gap-1">
              ⭐ {exhibitor.rating}
            </span>
            <span className="text-[11px] text-slate-400">Based on {exhibitor.review_count} reviews</span>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-3">
          {exhibitorReviews.length > 0 ? (
            exhibitorReviews.map(r => (
              <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{r.buyer_name}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{r.buyer_company}</span>
                  </div>
                  <div className="flex text-amber-400 font-bold">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed italic">
                  "{r.review_text}"
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Verified Trade Buyer Review
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-3">No reviews yet for this exhibitor.</p>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="font-extrabold text-sm text-slate-900">
            Leave an Exhibition Review
          </h4>

          {reviewSubmitted && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your review has been saved to Supabase and updated the exhibitor's live rating.</span>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Rating (1 to 5 Stars)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center transition-all ${
                      rating >= star 
                        ? 'bg-amber-400 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Feedback & Machinery Experience</label>
              <textarea
                rows={2}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                placeholder="Share your experience inspecting this exhibitor's machinery, cutting accuracy, and customer support..."
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </form>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        targetMatch={{
          stall: exhibitorStall,
          exhibitor: exhibitor,
          exhibition: exhibition,
          product: exhibitorProducts[0] || products[0],
          matchPercentage: 96
        }}
      />
    </div>
  );
}
