import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, Calendar, MapPin, ExternalLink, ArrowRight, UserCheck, Layers } from 'lucide-react';
import MatchScoreBadge from '../cards/MatchScoreBadge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function InteractiveFloorMap({ 
  exhibitionId = "exh-1", 
  recommendedStalls = [], 
  onSelectStall,
  onBookAppointment,
  onRequestStall,
  highlightStallNumber = null
}) {
  const { currentRole, currentUser } = useAuth();
  const { stalls, exhibitors, products, exhibitions } = useData();

  const [activeHall, setActiveHall] = useState("A");
  const [selectedStall, setSelectedStall] = useState(() => {
    if (highlightStallNumber) {
      return stalls.find(s => s.stall_number === highlightStallNumber && s.exhibition_id === exhibitionId);
    }
    if (recommendedStalls && recommendedStalls.length > 0) {
      return recommendedStalls[0]?.stall || null;
    }
    return null;
  });

  const exhibition = exhibitions.find(e => e.id === exhibitionId);

  // Filter stalls for this exhibition and hall
  const hallStalls = stalls.filter(s => s.exhibition_id === exhibitionId && s.hall_code === activeHall);

  // Group stalls into rows (5 columns per row)
  const rows = [];
  const maxRow = Math.max(...hallStalls.map(s => s.row_num), 6);
  for (let r = 1; r <= maxRow; r++) {
    const rowStalls = hallStalls.filter(s => s.row_num === r).sort((a, b) => a.col_num - b.col_num);
    if (rowStalls.length > 0) {
      rows.push({ rowNum: r, stalls: rowStalls });
    }
  }

  // Get matching data for the selected stall
  const getStallMeta = (stall) => {
    if (!stall) return null;
    const exhibitor = exhibitors.find(e => e.id === stall.current_exhibitor_id);
    const exhibitorProducts = exhibitor ? products.filter(p => p.exhibitor_id === exhibitor.id) : [];
    
    // Check if recommended in top results
    const rec = recommendedStalls.find(r => r.stall?.id === stall.id || r.stall?.stall_number === stall.stall_number);

    return {
      stall,
      exhibitor,
      products: exhibitorProducts,
      matchPercentage: rec?.matchPercentage || (stall.stall_number === "A24" ? 96 : stall.stall_number === "B17" ? 91 : stall.stall_number === "C08" ? 87 : null),
      matchDetails: rec?.matchDetails,
      isRecommended: Boolean(rec || stall.stall_number === "A24" || stall.stall_number === "B17" || stall.stall_number === "C08")
    };
  };

  const selectedMeta = getStallMeta(selectedStall);

  const isStallRecommended = (stallNum) => {
    return recommendedStalls.some(r => r.stall?.stall_number === stallNum) || 
      stallNum === "A24" || stallNum === "B17" || stallNum === "C08";
  };

  const isMyStall = (stall) => {
    if (currentRole === 'exhibitor' && stall.current_exhibitor_id === "exh-comp-1") {
      return true;
    }
    return false;
  };

  const getStallAppearance = (stall) => {
    const isSelected = selectedStall?.id === stall.id;
    const recommended = isStallRecommended(stall.stall_number);
    const mine = isMyStall(stall);

    if (mine) {
      return isSelected 
        ? 'bg-amber-500 text-white ring-4 ring-amber-300 shadow-lg scale-105 z-10' 
        : 'bg-amber-100 text-amber-900 border-2 border-amber-400 hover:bg-amber-200';
    }

    if (recommended) {
      return isSelected 
        ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white ring-4 ring-purple-300 shadow-xl scale-105 z-10' 
        : 'bg-purple-100 text-purple-900 border-2 border-purple-400 hover:bg-purple-200 shadow-sm';
    }

    if (stall.status === 'occupied') {
      return isSelected
        ? 'bg-blue-600 text-white ring-4 ring-blue-300 shadow-md scale-105 z-10'
        : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200';
    }

    if (stall.status === 'pending') {
      return isSelected
        ? 'bg-yellow-500 text-white ring-4 ring-yellow-300 shadow-md scale-105 z-10'
        : 'bg-yellow-50 text-yellow-800 border border-dashed border-yellow-400 hover:bg-yellow-100';
    }

    // Available
    return isSelected
      ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 shadow-md scale-105 z-10'
      : 'bg-emerald-50 text-emerald-800 border border-dashed border-emerald-300 hover:bg-emerald-100';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      {/* Map Control Header */}
      <div className="p-4 md:p-6 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">Interactive Exhibition Floor Map</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              Live Grid View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {exhibition?.name || "Manufacturing Expo Mumbai"} • {exhibition?.venue || "Bombay Exhibition Centre"}
          </p>
        </div>

        {/* Hall Selector Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveHall("A")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeHall === "A" 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Hall A (Heavy Machinery)
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-purple-100 text-purple-800 ml-1 font-extrabold">⭐ A24</span>
          </button>
          <button
            onClick={() => setActiveHall("B")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeHall === "B" 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Hall B (Automation & Robotics)
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-purple-100 text-purple-800 ml-1 font-extrabold">⭐ B17</span>
          </button>
          <button
            onClick={() => setActiveHall("C")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeHall === "C" 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Hall C (Tooling & Dies)
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-purple-100 text-purple-800 ml-1 font-extrabold">⭐ C08</span>
          </button>
        </div>
      </div>

      {/* Map Legend */}
      <div className="px-4 md:px-6 py-2.5 bg-slate-100/60 border-b border-slate-200 text-xs flex flex-wrap items-center gap-4 text-slate-600">
        <span className="font-bold text-slate-700">Map Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">★</span>
          <span className="font-semibold text-purple-900">AI Recommended</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-400"></span>
          <span>Available Stall</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-400"></span>
          <span>Occupied Stall</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-yellow-100 border border-yellow-400"></span>
          <span>Pending Request</span>
        </div>
        {currentRole === 'exhibitor' && (
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
            <span className="font-semibold text-amber-900">My Stall</span>
          </div>
        )}
      </div>

      {/* Map Content: Floor Grid + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[460px]">
        {/* Floor Plan Grid */}
        <div className="lg:col-span-8 p-6 bg-slate-50/50 overflow-x-auto flex flex-col justify-between">
          <div>
            {/* Hall Entrance Indicator */}
            <div className="mb-4 flex items-center justify-center">
              <div className="px-6 py-1 rounded-full bg-slate-200/80 text-slate-600 font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 border border-slate-300">
                <span>↓ Main Hall {activeHall} Visitors Entrance ↓</span>
              </div>
            </div>

            {/* Stalls Grid */}
            <div className="space-y-3 min-w-[500px]">
              {rows.map(({ rowNum, stalls }) => (
                <div key={rowNum} className="flex items-center justify-center gap-3">
                  <span className="w-6 text-[11px] font-bold text-slate-400 text-right">R{rowNum}</span>
                  <div className="flex gap-2.5 flex-1 justify-center">
                    {stalls.map(stall => {
                      const isRec = isStallRecommended(stall.stall_number);
                      const isSel = selectedStall?.id === stall.id;
                      const isMine = isMyStall(stall);

                      return (
                        <button
                          key={stall.id}
                          onClick={() => {
                            setSelectedStall(stall);
                            if (onSelectStall) onSelectStall(stall);
                          }}
                          className={`relative flex flex-col items-center justify-center rounded-xl p-2 transition-all cursor-pointer font-sans min-w-[76px] h-18 text-center ${getStallAppearance(stall)}`}
                        >
                          {/* Recommended Star Indicator */}
                          {isRec && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-yellow-400 text-yellow-950 flex items-center justify-center shadow-xs text-xs font-black ring-2 ring-white">
                              ★
                            </span>
                          )}

                          <span className={`text-xs font-extrabold ${isSel || isRec ? 'text-white' : 'text-slate-900'}`}>
                            {stall.stall_number}
                          </span>
                          
                          <span className={`text-[10px] leading-tight truncate w-full px-1 mt-0.5 ${isSel || isRec ? 'text-slate-100 opacity-90' : 'text-slate-500'}`}>
                            {stall.size}
                          </span>

                          <span className={`text-[9px] font-semibold mt-0.5 truncate w-full px-1 ${
                            isRec ? 'text-yellow-200' :
                            stall.status === 'occupied' ? (isSel ? 'text-white' : 'text-blue-700') :
                            stall.status === 'pending' ? 'text-yellow-700' : 'text-emerald-700'
                          }`}>
                            {isRec ? '96% Match' : stall.status.toUpperCase()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Fire Exit / Logistics Gate */}
            <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400 font-semibold px-4 pt-4 border-t border-slate-200">
              <span>← Emergency Exit & Restrooms</span>
              <span className="text-slate-500">Service & Freight Door A-04 →</span>
            </div>
          </div>
        </div>

        {/* Selected Stall Detail Panel */}
        <div className="lg:col-span-4 p-5 md:p-6 bg-white flex flex-col justify-between">
          {selectedMeta ? (
            <div className="space-y-4">
              {/* Stall Title Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      Stall {selectedMeta.stall.stall_number}
                    </span>
                    {selectedMeta.isRecommended && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold flex items-center gap-1 border border-purple-200">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        Top Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hall {selectedMeta.stall.hall_code} • {selectedMeta.stall.size} • {selectedMeta.stall.category}
                  </p>
                </div>

                {selectedMeta.matchPercentage && (
                  <MatchScoreBadge 
                    score={selectedMeta.matchPercentage} 
                    matchDetails={selectedMeta.matchDetails}
                    size="lg"
                  />
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                  selectedMeta.stall.status === 'occupied' 
                    ? 'bg-blue-100 text-blue-800' 
                    : selectedMeta.stall.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Status: {selectedMeta.stall.status}
                </span>
                <span className="text-xs text-slate-500">
                  Rate: ₹{(selectedMeta.stall.base_price || 85000).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Exhibitor Card */}
              {selectedMeta.exhibitor ? (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedMeta.exhibitor.logo_url} 
                      alt={selectedMeta.exhibitor.company_name} 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {selectedMeta.exhibitor.company_name}
                        </h4>
                        {selectedMeta.exhibitor.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          {selectedMeta.exhibitor.rating} ({selectedMeta.exhibitor.review_count})
                        </span>
                        <span>•</span>
                        <span className="truncate">{selectedMeta.exhibitor.city}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {selectedMeta.exhibitor.description}
                  </p>

                  {/* Showcase Products at this Stall */}
                  {selectedMeta.products.length > 0 && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Featured at Stall:
                      </span>
                      <div className="space-y-1.5">
                        {selectedMeta.products.slice(0, 2).map(prod => (
                          <div key={prod.id} className="text-xs bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-medium text-slate-800 truncate mr-2">{prod.name}</span>
                            <span className="font-bold text-blue-600 shrink-0">
                              ₹{(prod.price_min/100000).toFixed(1)}L+
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                  <p className="font-bold">This stall is currently available!</p>
                  <p className="mt-1 text-emerald-700">
                    High footfall zone near Hall {selectedMeta.stall.hall_code} main aisle. Suitable for machine displays and modular setups.
                  </p>
                </div>
              )}

              {/* Action Buttons depending on user role */}
              <div className="pt-3 space-y-2">
                {selectedMeta.exhibitor && (
                  <button
                    onClick={() => {
                      if (onBookAppointment) {
                        onBookAppointment(selectedMeta);
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Booth Appointment
                  </button>
                )}

                {selectedMeta.stall.status === 'available' && currentRole === 'exhibitor' && (
                  <button
                    onClick={() => {
                      if (onRequestStall) {
                        onRequestStall(selectedMeta.stall);
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    Request This Stall ({selectedMeta.stall.stall_number})
                  </button>
                )}

                {selectedMeta.exhibitor && (
                  <a
                    href={`/buyer/exhibitor/${selectedMeta.exhibitor.id}`}
                    className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    View Company Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              Click any stall on the map to inspect exhibitor, products, and schedule meetings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
