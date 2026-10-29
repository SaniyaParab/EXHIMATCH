import React, { useState } from 'react';
import { Bookmark, Building2, Store } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ExhibitionCard from '../../components/cards/ExhibitionCard';
import ExhibitorCard from '../../components/cards/ExhibitorCard';
import EmptyState from '../../components/common/EmptyState';

export default function BuyerSaved() {
  const { savedExhibitions, savedExhibitors, exhibitions, exhibitors } = useData();
  const [activeTab, setActiveTab] = useState("exhibitions");

  const bookmarkedExhibitions = exhibitions.filter(e => savedExhibitions.includes(e.id));
  const bookmarkedExhibitors = exhibitors.filter(e => savedExhibitors.includes(e.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Saved Exhibitions & Suppliers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bookmarked trade fairs and machine manufacturers for fast reference.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab("exhibitions")}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "exhibitions" 
                ? 'bg-white text-blue-600 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exhibitions ({bookmarkedExhibitions.length})
          </button>
          <button
            onClick={() => setActiveTab("exhibitors")}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "exhibitors" 
                ? 'bg-white text-blue-600 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Suppliers ({bookmarkedExhibitors.length})
          </button>
        </div>
      </div>

      {activeTab === "exhibitions" ? (
        bookmarkedExhibitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedExhibitions.map(exh => (
              <ExhibitionCard key={exh.id} exhibition={exh} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Bookmark}
            title="No saved exhibitions"
            description="Bookmark trade fairs while browsing to easily access their floor plans and stall maps."
            actionText="Browse Exhibitions"
            actionPath="/exhibitions"
          />
        )
      ) : (
        bookmarkedExhibitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedExhibitors.map(ex => (
              <ExhibitorCard key={ex.id} exhibitor={ex} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Building2}
            title="No saved suppliers"
            description="Save high-rating machinery builders to stay updated on their latest booth demos."
            actionText="Discover Matches"
            actionPath="/buyer/results"
          />
        )
      )}
    </div>
  );
}
