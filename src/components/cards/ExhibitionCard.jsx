import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Store, ArrowRight, Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';
import MatchScoreBadge from './MatchScoreBadge';
import { useData } from '../../context/DataContext';

export default function ExhibitionCard({ exhibition, matchScore, matchingStallsCount }) {
  const { savedExhibitions, toggleSaveExhibition } = useData();
  const isSaved = savedExhibitions.includes(exhibition.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img 
          src={exhibition.banner_image} 
          alt={exhibition.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {matchScore ? (
            <MatchScoreBadge score={matchScore} size="md" />
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
              {exhibition.status.toUpperCase()}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveExhibition(exhibition.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-all"
            title={isSaved ? "Saved" : "Save Exhibition"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-semibold">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{exhibition.city}, {exhibition.state} ({exhibition.distance_km || 62} km away)</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {exhibition.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {exhibition.tagline || exhibition.description}
          </p>

          {/* Dates & Stats */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{exhibition.start_date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{exhibition.exhibitor_count || 127} Exhibitors</span>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exhibition.categories.slice(0, 3).map((cat, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-purple-600" />
            {matchingStallsCount || 3} Matching Stalls
          </span>

          <Link
            to={`/buyer/exhibition/${exhibition.id}`}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 group-hover:bg-blue-600 group-hover:text-white"
          >
            <span>View Stalls</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
