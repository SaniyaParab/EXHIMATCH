import React from 'react';
import { Link } from 'react-router-dom';
import { Store, CheckCircle2, MapPin, Building2, Package, Map, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';
import ProductCard from '../../components/cards/ProductCard';

export default function ExhibitorMyStall() {
  const { stalls, exhibitions, products, exhibitors } = useData();

  // Find ABC Machinery stall
  const myStall = stalls.find(s => s.stall_number === "A24" && s.current_exhibitor_id === "exh-comp-1") || stalls[0];
  const exhibition = exhibitions.find(e => e.id === myStall.exhibition_id) || exhibitions[0];
  const exhibitor = exhibitors.find(e => e.id === "exh-comp-1") || exhibitors[0];
  const stallProducts = products.filter(p => p.exhibitor_id === "exh-comp-1");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider inline-block mb-2">
          Exhibitor Space Allocation
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Stall: {myStall.stall_number}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Your confirmed trade fair booth location, equipment displays, and live floor coordinates.
        </p>
      </div>

      {/* Main Stall Summary Card (Matches Prompt Example) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                STALL {myStall.stall_number}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ✓ Confirmed
              </span>
            </div>

            <p className="font-bold text-slate-700 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>{exhibitor.company_name}</span>
              <span className="text-slate-300">•</span>
              <span>Hall {myStall.hall_code} (Precision Machinery & Laser)</span>
            </p>

            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{exhibition.name} ({exhibition.venue}, {exhibition.city})</span>
            </p>
          </div>

          {/* Stall Specifications */}
          <div className="flex flex-col sm:items-end gap-2 text-xs">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-1 text-right">
              <span className="font-extrabold text-purple-900 block">Stall Dimensions</span>
              <span className="text-sm font-black text-purple-700">{myStall.size} (18 sq.m)</span>
              <span className="text-[10px] text-purple-600 block">Double Open Corner Booth</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/buyer/map/${exhibition.id}`}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            <Map className="w-4 h-4" />
            <span>View Full Exhibition Map</span>
          </Link>

          <Link
            to="/exhibitor/products"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products on Display ({stallProducts.length})</span>
          </Link>
        </div>
      </div>

      {/* Interactive Floor Map highlighting A24 */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">
          Live Floor Grid Location (Hall A)
        </h3>
        <InteractiveFloorMap
          exhibitionId={exhibition.id}
          highlightStallNumber="A24"
        />
      </div>

      {/* Machinery on Display at Stall */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-lg">
            Machinery Scheduled for Live Demonstration
          </h3>
          <Link to="/exhibitor/products" className="text-xs font-bold text-blue-600 hover:text-blue-800">
            Add More Machinery +
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stallProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} isExhibitorOwner={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
