import React, { useState } from 'react';
import { Inbox, Sparkles, Search, Filter, Phone, Mail, CheckCircle2, TrendingUp, Download } from 'lucide-react';
import { useData } from '../../context/DataContext';
import LeadCard from '../../components/cards/LeadCard';
import EmptyState from '../../components/common/EmptyState';

export default function ExhibitorLeads() {
  const { leads } = useData();
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l => {
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    const matchesSearch = 
      l.buyer_company?.toLowerCase().includes(search.toLowerCase()) ||
      l.buyer_name?.toLowerCase().includes(search.toLowerCase()) ||
      l.product_name?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ["all", "New", "Contacted", "Meeting Scheduled", "Converted", "Closed"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Qualified B2B Leads CRM
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
              {leads.length} Active Leads
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-qualified industrial buyers with verified budgets, technical requirements, and booked booth demo slots.
          </p>
        </div>

        {/* Search & Export */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Stage Pills Filter */}
      <div className="flex overflow-x-auto gap-2 p-1 bg-slate-100 rounded-2xl w-fit text-xs">
        {statuses.map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 capitalize ${
              filterStatus === st 
                ? 'bg-white text-blue-600 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {st} {st !== "all" && `(${leads.filter(l => l.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Leads Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Inbox}
          title="No leads matching criteria"
          description="Try changing the lead stage filter or clearing your search term."
        />
      )}
    </div>
  );
}
