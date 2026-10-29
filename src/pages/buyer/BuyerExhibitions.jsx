import React, { useState } from 'react';
import { Building2, Search, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ExhibitionCard from '../../components/cards/ExhibitionCard';

export default function BuyerExhibitions() {
  const { aiResults } = useData();
  const [search, setSearch] = useState("");

  const filtered = aiResults.recommendedExhibitions.filter(ex => 
    ex.name.toLowerCase().includes(search.toLowerCase()) ||
    ex.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Recommended Exhibitions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by AI match percentage based on multiple exhibiting suppliers matching your requirement.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exhibitions..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(exh => (
          <ExhibitionCard 
            key={exh.id} 
            exhibition={exh} 
            matchScore={exh.matchPercentage}
            matchingStallsCount={exh.matchingStallsCount}
          />
        ))}
      </div>
    </div>
  );
}
