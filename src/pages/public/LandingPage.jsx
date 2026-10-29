import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Store,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  Star,
  ChevronRight,
  Zap,
  Globe2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ExhibitionCard from '../../components/cards/ExhibitionCard';
import StallCard from '../../components/cards/StallCard';
import BookingModal from '../../components/common/BookingModal';

export default function LandingPage() {
  const { exhibitions, aiResults, executeAIMatching } = useData();
  const { switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [searchProduct, setSearchProduct] = useState("CNC Laser Cutting Machine");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleHeroSearch = async (e) => {
    e.preventDefault();
    await executeAIMatching({
      product_name: searchProduct,
      category: "Industrial Machinery",
      budget_min: 2000000,
      budget_max: 3000000,
      location: "Mumbai",
      max_distance: 200,
      preferred_date: "2026-11-13"
    });
    navigate('/buyer/results');
  };

  const handleBook = (match) => {
    setSelectedMatch(match);
    setBookingOpen(true);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01f_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-xs text-xs font-bold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Next-Gen B2B Discovery • OpsGenie AI Track</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-purple-600">Patented Stall-Level Matching</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Find the Right Exhibition. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Find the Right Supplier.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              AI-powered B2B discovery that connects buyers with the most relevant exhibitions, exhibitors and stalls. Zero wasted travel. Direct machine demonstrations.
            </p>

            {/* Search Card */}
            <div className="pt-4 max-w-2xl mx-auto">
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder="Enter machine e.g. CNC Laser Cutting Machine, Packaging..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 sm:bg-transparent rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 sm:focus:bg-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all shrink-0 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Find My Matches</span>
                </button>
              </form>

              {/* Quick tags */}
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-[11px] text-slate-500 font-medium">
                <span>Trending:</span>
                {["CNC Laser Cutting", "VMC 5-Axis", "Robotic Welding Cell", "Pouch Packaging"].map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchProduct(t);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 rounded-full border border-slate-200 text-slate-700 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Workflow Graphic: Buyer Req -> AI -> Exhibition -> Stall -> Business */}
            <div className="pt-10 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-card">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-4 text-center">
                  Integrated End-to-End B2B Transaction Flow
                </span>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col items-center">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs mb-1.5">1</span>
                    <span className="font-extrabold text-xs text-slate-900">Buyer Requirement</span>
                    <span className="text-[10px] text-slate-500">Specs, budget & location</span>
                  </div>

                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex flex-col items-center">
                    <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs mb-1.5">2</span>
                    <span className="font-extrabold text-xs text-slate-900">AI 6-Factor Match</span>
                    <span className="text-[10px] text-slate-500">Relevance & affinity %</span>
                  </div>

                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-col items-center">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs mb-1.5">3</span>
                    <span className="font-extrabold text-xs text-slate-900">Relevant Trade Expo</span>
                    <span className="text-[10px] text-slate-500">Manufacturing Expo (92%)</span>
                  </div>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex flex-col items-center">
                    <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs mb-1.5">4</span>
                    <span className="font-extrabold text-xs text-slate-900">Exact Stall Match</span>
                    <span className="text-[10px] text-slate-500">Stall A24 (96% Match)</span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col items-center col-span-2 md:col-span-1">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-1.5">5</span>
                    <span className="font-extrabold text-xs text-slate-900">Qualified B2B Lead</span>
                    <span className="text-[10px] text-slate-500">Booked demo & CRM sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problem */}
          <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100 space-y-4">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-xs uppercase tracking-wider">
              The B2B Industrial Dilemma
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Why Buying Industrial Machinery Is Broken
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a factory director needs a ₹25 Lakh CNC Laser Cutting Machine, they spend weeks traveling across different cities, browsing generic supplier directories, and walking blindly across 500+ stalls in trade fairgrounds without knowing which exhibitor actually manufactures what they need.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-xs font-bold">✕</span>
                <span>Wasted travel to distant vendors across multiple states</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-xs font-bold">✕</span>
                <span>Unverified brokers instead of genuine equipment makers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-xs font-bold">✕</span>
                <span>Trade fairs recommend entire cities, never specific booth stalls</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs uppercase tracking-wider">
              The ExhiMatch AI Solution
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Precision Stall-Level Exhibition Matching
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              ExhiMatch AI indexes machine specifications, floor maps, and exhibitor booths. In 1 second, our 6-factor algorithm finds the nearest trade fair where multiple verified manufacturers will physically demo the machine you need at exact booth stalls.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>One trip connects you with 3–5 competing suppliers in one hall</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Exact stall recommendations: e.g. ABC Machinery at Stall A24</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Guaranteed live cutting and performance testing on site</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. LIVE DEMO SCENARIO SPOTLIGHT (Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider">
                  Live Hackathon Test Scenario
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2">
                  "CNC Laser Cutting Machine" → Stall A24 (96% Match)
                </h2>
              </div>

              <button
                onClick={() => {
                  switchDemoRole('buyer');
                  navigate('/buyer/results');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Top Stall Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {aiResults.topStalls.slice(0, 3).map((match, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500 text-white text-xs font-black">
                      STALL {match.stall.stall_number}
                    </span>
                    <span className="text-xs font-black text-emerald-400">
                      {match.matchPercentage}% Match
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white">{match.exhibitor.company_name}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{match.product.name}</p>
                    <span className="text-amber-400 text-xs font-bold block mt-1">
                      ⭐ {match.exhibitor.rating} ({match.exhibitor.review_count} reviews)
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Hall {match.stall.hall_code}</span>
                    <button
                      onClick={() => handleBook(match)}
                      className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-bold text-[11px] transition-colors"
                    >
                      Book Booth Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING MAJOR EXHIBITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider block mb-1">
              Industrial Calendar 2026–2027
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured B2B Trade Exhibitions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Over 1,200 verified exhibitors ready for booth appointments and live demonstrations.
            </p>
          </div>

          <Link
            to="/exhibitions"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All 10 Exhibitions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitions.slice(0, 3).map(exh => (
            <ExhibitionCard key={exh.id} exhibition={exh} matchScore={exh.id === 'exh-1' ? 92 : null} />
          ))}
        </div>
      </section>

      {/* 5. THREE ROLES ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider">
            Connected Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tailored Dashboards for Every Stakeholder
          </h2>
          <p className="text-xs text-slate-500">
            Switch seamlessly between buyer, exhibitor, and organizer workflows with unified Supabase data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buyer */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">For Industrial Buyers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your machinery requirement, budget, and travel radius. AI matches you with the best trade expo, exhibitors, and exact floor stalls.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">✓ 6-factor weighted AI scoring</li>
                <li className="flex items-center gap-1.5">✓ Interactive floor maps & routes</li>
                <li className="flex items-center gap-1.5">✓ 1-click live booth appointments</li>
              </ul>
            </div>
            <button
              onClick={() => {
                switchDemoRole('buyer');
                navigate('/buyer/dashboard');
              }}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Enter as Buyer (Rajesh)
            </button>
          </div>

          {/* Exhibitor */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">For Equipment Exhibitors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Showcase machines, apply for booths, and receive pre-qualified B2B buyers with confirmed appointment times before the show even starts.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">✓ Real-time Qualified Lead CRM</li>
                <li className="flex items-center gap-1.5">✓ Stall allocation & floor plan sync</li>
                <li className="flex items-center gap-1.5">✓ Analytics & pipeline conversion</li>
              </ul>
            </div>
            <button
              onClick={() => {
                switchDemoRole('exhibitor');
                navigate('/exhibitor/dashboard');
              }}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Enter as Exhibitor (ABC Machinery)
            </button>
          </div>

          {/* Organizer */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">For Trade Fair Organizers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage exhibitions, create halls and stalls, approve exhibitor requests, and monitor overall trade visitor engagement.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">✓ Visual floor grid management</li>
                <li className="flex items-center gap-1.5">✓ 1-click stall approval workflow</li>
                <li className="flex items-center gap-1.5">✓ Exhibition traffic & lead tracking</li>
              </ul>
            </div>
            <button
              onClick={() => {
                switchDemoRole('organizer');
                navigate('/organizer/dashboard');
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Enter as Organizer (MITE)
            </button>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-black max-w-xl mx-auto tracking-tight">
            Ready to Discover the Right Machinery at the Right Exhibition?
          </h2>
          <p className="text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
            Join hundreds of manufacturers and procurement directors saving 70% of their equipment sourcing time.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/buyer/discover"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-blue-900 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Start AI Supplier Matching</span>
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-800/60 hover:bg-blue-800 text-white rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Register Exhibitor Company</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedMatch && (
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          targetMatch={selectedMatch}
        />
      )}
    </div>
  );
}
