import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Building2, Store, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ExhibitorCard({ exhibitor }) {
  const { savedExhibitors, toggleSaveExhibitor, products, stalls } = useData();
  const isSaved = savedExhibitors.includes(exhibitor.id);

  const exhibitorProducts = products.filter(p => p.exhibitor_id === exhibitor.id);
  const exhibitorStall = stalls.find(s => s.current_exhibitor_id === exhibitor.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src={exhibitor.logo_url} 
              alt={exhibitor.company_name} 
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white p-0.5 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {exhibitor.company_name}
                </h3>
                {exhibitor.verified && (
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {exhibitor.city}, {exhibitor.state} • Est. {exhibitor.year_established || 2010}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleSaveExhibitor(exhibitor.id)}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Rating & Stall */}
        <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            {exhibitor.rating} ({exhibitor.review_count} ratings)
          </span>

          {exhibitorStall && (
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-black text-[11px]">
              Stall {exhibitorStall.stall_number} (Hall {exhibitorStall.hall_code})
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
          {exhibitor.description}
        </p>

        {/* Products count tag */}
        <div className="mt-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[11px]">
            {exhibitorProducts.length} Machines / Products Listed
          </span>
          <span className="text-[11px] text-slate-400 truncate">
            {exhibitor.business_category}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <Link
          to={`/buyer/exhibitor/${exhibitor.id}`}
          className="w-full py-2 px-3 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <span>View Profile & Booth</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
