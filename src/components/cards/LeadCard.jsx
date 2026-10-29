import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building2, Store, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import MatchScoreBadge from './MatchScoreBadge';
import { useData } from '../../context/DataContext';

export default function LeadCard({ lead, onStatusChange }) {
  const { stalls, exhibitions, updateLeadStatus } = useData();
  const [currentStatus, setCurrentStatus] = useState(lead.status);

  const stall = stalls.find(s => s.id === lead.stall_id);
  const exhibition = exhibitions.find(ex => ex.id === lead.exhibition_id);

  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Converted', 'Closed'];

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200',
    'Contacted': 'bg-purple-100 text-purple-800 border-purple-200',
    'Meeting Scheduled': 'bg-amber-100 text-amber-800 border-amber-200',
    'Converted': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Closed': 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const handleStatusSelect = (newStatus) => {
    setCurrentStatus(newStatus);
    updateLeadStatus(lead.id, newStatus);
    if (onStatusChange) onStatusChange(lead.id, newStatus);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4 hover:shadow-card-hover transition-all">
      {/* Header: Buyer Company & Match % */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-base text-slate-900">
              {lead.buyer_company || lead.buyer_name}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusColors[currentStatus] || statusColors.New}`}>
              {currentStatus}
            </span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{lead.buyer_name}</span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{lead.buyer_location}</span>
          </p>
        </div>

        <MatchScoreBadge score={lead.match_percentage} size="md" />
      </div>

      {/* Requirement Details Box */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Target Equipment:</span>
          <span className="font-bold text-slate-900">{lead.product_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Buyer Budget:</span>
          <span className="font-extrabold text-blue-600">{lead.budget_range}</span>
        </div>
        {stall && (
          <div className="flex justify-between items-center pt-1 border-t border-slate-200">
            <span className="text-slate-500 font-medium">Meeting Booth:</span>
            <span className="font-black text-purple-700">
              Stall {stall.stall_number} ({exhibition?.name || "Manufacturing Expo"})
            </span>
          </div>
        )}
      </div>

      {/* Contact info & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
        <a 
          href={`tel:${lead.buyer_phone}`} 
          className="flex items-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">{lead.buyer_phone}</span>
        </a>
        <a 
          href={`mailto:${lead.buyer_email}`} 
          className="flex items-center gap-1.5 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">{lead.buyer_email}</span>
        </a>
      </div>

      {lead.notes && (
        <p className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
          "{lead.notes}"
        </p>
      )}

      {/* Status Update Dropdown */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">Update Lead Stage:</span>
        <select
          value={currentStatus}
          onChange={(e) => handleStatusSelect(e.target.value)}
          className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
        >
          {statuses.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
