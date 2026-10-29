import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Store, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ExhibitionCard from '../../components/cards/ExhibitionCard';
import EmptyState from '../../components/common/EmptyState';

export default function PublicExhibitionsPage() {
  const { exhibitions } = useData();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const categories = ["All", "Industrial Machinery", "Manufacturing", "Automotive", "Industrial Automation", "Construction", "Packaging", "Electronics"];
  const cities = ["All", "Mumbai", "New Delhi", "Pune", "Bengaluru", "Gandhinagar", "Chennai", "Hyderabad", "Kolkata"];

  const filteredExhibitions = exhibitions.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) || 
      ex.city.toLowerCase().includes(search.toLowerCase()) ||
      ex.categories.some(c => c.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || ex.categories.includes(selectedCategory);
    const matchesCity = selectedCity === "All" || ex.city.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Public Exhibition Discovery
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore upcoming industrial trade fairs, engineering shows, and machinery expos across India.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exhibitions by name or city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent"
          />
        </div>

        {/* Category & City selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {cities.map(c => (
              <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Exhibitions Grid */}
      {filteredExhibitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExhibitions.map(ex => (
            <ExhibitionCard 
              key={ex.id} 
              exhibition={ex} 
              matchScore={ex.id === 'exh-1' ? 92 : null}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No exhibitions match your filter"
          description="Try broadening your category or location filter to see more trade events."
          actionText="Reset Filters"
          onAction={() => {
            setSearch("");
            setSelectedCategory("All");
            setSelectedCity("All");
          }}
        />
      )}
    </div>
  );
}
