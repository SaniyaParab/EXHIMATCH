import React from 'react';
import { TrendingUp, Users, DollarSign, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import LeadCard from '../../components/cards/LeadCard';

export default function OrganizerLeads() {
  const { leads } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Exhibition Generated Leads & Commercial Impact
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          High-intent procurement inquiries matched and routed through ExhiMatch AI during the exhibition cycle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
