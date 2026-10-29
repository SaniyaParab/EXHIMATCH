import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, MapPin, DollarSign, Calendar, Layers, CheckCircle2, ArrowRight, Loader2, Bot } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function BuyerDiscover() {
  const { buyerRequirement, executeAIMatching } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [productName, setProductName] = useState(buyerRequirement.product_name || "CNC Laser Cutting Machine");
  const [category, setCategory] = useState(buyerRequirement.category || "Industrial Machinery");
  const [budgetMin, setBudgetMin] = useState(buyerRequirement.budget_min || 2000000);
  const [budgetMax, setBudgetMax] = useState(buyerRequirement.budget_max || 3000000);
  const [location, setLocation] = useState(buyerRequirement.location || currentUser?.city || "Mumbai");
  const [maxDistance, setMaxDistance] = useState(buyerRequirement.max_distance || 200);
  const [preferredDate, setPreferredDate] = useState(buyerRequirement.preferred_date || "2026-11-13");
  const [additionalNotes, setAdditionalNotes] = useState(buyerRequirement.additional_notes || "Suitable for metal sheet cutting with fast piercing speeds.");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "ExhiMatch AI is analyzing your requirement...",
    "Scanning 105+ industrial machinery catalogs...",
    "Matching 50+ verified equipment manufacturers...",
    "Computing 6-factor affinity scores...",
    "Locating confirmed booth stalls on floor maps..."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Multi-phase loading animation
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise(r => setTimeout(r, 450));
    }

    await executeAIMatching({
      product_name: productName,
      category,
      budget_min: Number(budgetMin),
      budget_max: Number(budgetMax),
      location,
      max_distance: Number(maxDistance),
      preferred_date: preferredDate,
      additional_notes: additionalNotes
    });

    setIsLoading(false);
    navigate('/buyer/results');
  };

  const handleApplyPreset = (preset) => {
    setProductName(preset.product);
    setCategory(preset.cat);
    setBudgetMin(preset.min);
    setBudgetMax(preset.max);
    setLocation(preset.loc);
    setAdditionalNotes(preset.notes);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black uppercase tracking-wider inline-block mb-2">
          OpsGenie AI Matching Engine
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Find Your Perfect Supplier
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Specify your equipment parameters. ExhiMatch AI will correlate live exhibition floor plans to find exactly which stalls have your machine ready for demo.
        </p>
      </div>

      {/* Preset Scenarios Card */}
      <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 text-xs">
        <span className="font-bold text-blue-900 block mb-2">
          ⚡ 1-Click Test Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleApplyPreset({
              product: "CNC Laser Cutting Machine",
              cat: "Industrial Machinery",
              min: 2000000,
              max: 3000000,
              loc: "Mumbai",
              notes: "Suitable for metal sheet cutting with fast piercing speeds"
            })}
            className="px-3 py-1.5 bg-white hover:bg-blue-100 font-bold text-blue-700 rounded-xl border border-blue-200 shadow-2xs transition-colors"
          >
            ⭐ Hackathon Scenario: CNC Laser (₹20-30L Mumbai)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              product: "Robotic CNC Laser Cutting & Welding Cell",
              cat: "Industrial Automation",
              min: 2200000,
              max: 3200000,
              loc: "Mumbai",
              notes: "6-axis robot for automotive chassis welding"
            })}
            className="px-3 py-1.5 bg-white hover:bg-blue-100 font-bold text-slate-700 rounded-xl border border-slate-200 transition-colors"
          >
            Robotic Welding Cell (₹22-32L)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset({
              product: "Automatic Packaging & Pouch Sealing Machine",
              cat: "Packaging",
              min: 1200000,
              max: 1800000,
              loc: "Pune",
              notes: "Continuous multi-track pouch packaging for powders"
            })}
            className="px-3 py-1.5 bg-white hover:bg-blue-100 font-bold text-slate-700 rounded-xl border border-slate-200 transition-colors"
          >
            Packaging Machine under ₹18L (Pune)
          </button>
        </div>
      </div>

      {/* Main Requirement Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6 text-xs relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 animate-bounce">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h4 className="font-black text-slate-900 text-base">
                ExhiMatch AI Engine Working
              </h4>
              <p className="text-xs text-blue-600 font-bold min-h-[20px] transition-all">
                {loadingSteps[loadingStep]}
              </p>
            </div>

            <div className="w-64 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* 1. Machinery Information */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            1. Machinery & Equipment Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Product / Machinery Required *
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  placeholder="e.g. CNC Laser Cutting Machine"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Industry Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Industrial Machinery">Industrial Machinery</option>
                <option value="Manufacturing">Manufacturing & Sheet Metal</option>
                <option value="Industrial Automation">Industrial Automation & Robotics</option>
                <option value="Automotive">Automotive & Components</option>
                <option value="Packaging">Packaging & Processing</option>
                <option value="Construction">Heavy Construction Equipment</option>
                <option value="Agriculture">Agricultural Machinery</option>
                <option value="Electronics">Industrial Electronics & SMT</option>
                <option value="Logistics">Material Handling & Logistics</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Budget & Pricing */}
        <div className="space-y-4 pt-2">
          <h4 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            2. Budget Range (INR)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Minimum Budget (INR)</label>
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                step="100000"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                ₹{(budgetMin / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Maximum Budget (INR)</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                step="100000"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                ₹{(budgetMax / 100000).toFixed(1)} Lakhs
              </span>
            </div>
          </div>
        </div>

        {/* 3. Location & Travel Distance */}
        <div className="space-y-4 pt-2">
          <h4 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            3. Location & Travel Radius
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Base City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Travel Distance (km)</label>
              <input
                type="number"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                placeholder="200"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Up to {maxDistance} km from {location}
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Preferred Exhibition Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* 4. Additional Specifications */}
        <div className="space-y-2 pt-2">
          <label className="font-bold text-slate-700 block">
            Additional Technical Requirements & Notes
          </label>
          <textarea
            rows={3}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="e.g. Must support 16mm mild steel cutting, German laser head, autofocus, dual shuttle table..."
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Find My Matches with ExhiMatch AI</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
