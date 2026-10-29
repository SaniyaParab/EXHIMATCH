import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Building2, Calendar, Package, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { products, exhibitors, exhibitions, stalls } = useData();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "CNC Laser Cutting Machine",
    "Automation Expo 2026",
    "ABC Machinery",
    "Hydraulic Press"
  ]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom mechanism or callback
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? products.filter(p => p.name.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed)).slice(0, 4)
    : [];

  const matchingExhibitors = trimmed
    ? exhibitors.filter(e => e.company_name.toLowerCase().includes(trimmed) || e.business_category.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const matchingExhibitions = trimmed
    ? exhibitions.filter(ex => ex.name.toLowerCase().includes(trimmed) || ex.city.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const hasResults = matchingProducts.length > 0 || matchingExhibitors.length > 0 || matchingExhibitions.length > 0;

  const handleSelect = (url, searchTerm) => {
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, exhibitors, exhibitions, stalls..."
            autoFocus
            className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {query ? (
            <button 
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <span className="hidden sm:inline-flex text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
            ESC
          </span>
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!trimmed && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Popular & Recent Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="py-12 text-center">
              <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No matching results found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for "CNC Laser", "Machinery", or "Mumbai Expo"
              </p>
            </div>
          )}

          {/* Product Results */}
          {matchingProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  Products ({matchingProducts.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect('/buyer/results', p.name)}
                    className="p-3 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Category: {p.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-blue-600">
                        ₹{(p.price_min / 100000).toFixed(0)}–{(p.price_max / 100000).toFixed(0)} Lakhs
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exhibitor Results */}
          {matchingExhibitors.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  Exhibitors ({matchingExhibitors.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchingExhibitors.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => handleSelect(`/buyer/exhibitor/${e.id}`, e.company_name)}
                    className="p-3 hover:bg-purple-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600">
                        {e.company_name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {e.business_category} • {e.city}, {e.state}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exhibition Results */}
          {matchingExhibitions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Exhibitions ({matchingExhibitions.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchingExhibitions.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => handleSelect(`/buyer/exhibition/${ex.id}`, ex.name)}
                    className="p-3 hover:bg-emerald-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                        {ex.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {ex.venue}, {ex.city}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Search ExhiLink AI dataset instantly</span>
          <span className="font-semibold text-slate-700">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
