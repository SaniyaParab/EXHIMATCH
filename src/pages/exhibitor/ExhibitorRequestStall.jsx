import React, { useState } from 'react';
import { Store, Building2, CheckCircle2, Clock, Map, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';

export default function ExhibitorRequestStall() {
  const { exhibitions, stalls, requestStall, stallRequests } = useData();

  const [selectedExhibitionId, setSelectedExhibitionId] = useState("exh-1");
  const [selectedStall, setSelectedStall] = useState(null);
  const [requestNotes, setRequestNotes] = useState("Require 3-phase 63A power connection for live laser demonstration.");
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const selectedExhibition = exhibitions.find(e => e.id === selectedExhibitionId) || exhibitions[0];

  const handleRequest = (e) => {
    e.preventDefault();
    if (!selectedStall) return;

    const result = requestStall({
      exhibitionId: selectedExhibitionId,
      exhibitorId: "exh-comp-1",
      stallId: selectedStall.id,
      notes: requestNotes
    });

    if (result.success) {
      setSubmittedStatus("Your stall request has been submitted to the trade organizer! Status: PENDING APPROVAL.");
      setTimeout(() => setSubmittedStatus(null), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider inline-block mb-2">
          Exhibition Floor Booking Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Request Exhibition Stall
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select an upcoming trade exhibition, view the real-time floor plan, pick an available booth, and submit for organizer approval.
        </p>
      </div>

      {submittedStatus && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{submittedStatus}</span>
        </div>
      )}

      {/* Select Exhibition dropdown */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
          <span className="font-bold text-slate-800 text-xs">Select Target Exhibition:</span>
        </div>

        <select
          value={selectedExhibitionId}
          onChange={(e) => {
            setSelectedExhibitionId(e.target.value);
            setSelectedStall(null);
          }}
          className="w-full sm:w-80 px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {exhibitions.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.name} ({ex.city})</option>
          ))}
        </select>
      </div>

      {/* Interactive Floor Map */}
      <InteractiveFloorMap
        exhibitionId={selectedExhibitionId}
        onSelectStall={(stall) => setSelectedStall(stall)}
        onRequestStall={(stall) => {
          setSelectedStall(stall);
        }}
      />

      {/* Stall Request Confirmation Box */}
      {selectedStall && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4 text-xs animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selected Booth</span>
              <h3 className="text-xl font-black text-slate-900">
                STALL {selectedStall.stall_number} (Hall {selectedStall.hall_code})
              </h3>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              selectedStall.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              Status: {selectedStall.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold block">Size</span>
              <span className="font-bold text-slate-900 text-sm">{selectedStall.size}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold block">Category</span>
              <span className="font-bold text-slate-900 text-sm">{selectedStall.category}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold block">Base Exhibition Fee</span>
              <span className="font-bold text-blue-600 text-sm">₹{(selectedStall.base_price || 85000).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {selectedStall.status === 'available' ? (
            <form onSubmit={handleRequest} className="space-y-3 pt-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Specific Electrical & Booth Setup Requirements
                </label>
                <textarea
                  rows={2}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Request Stall {selectedStall.stall_number} for Approval</span>
              </button>
            </form>
          ) : (
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-800 font-bold">
              This stall is currently {selectedStall.status}. Please select an available green stall on the floor map.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
