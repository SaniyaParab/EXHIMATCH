import React, { useState } from 'react';
import { Send, CheckCircle2, XCircle, Clock, Building2, Store } from 'lucide-react';
import { useData } from '../../context/DataContext';
import EmptyState from '../../components/common/EmptyState';

export default function OrganizerStallRequests() {
  const { stallRequests, approveStallRequest, rejectStallRequest, exhibitions } = useData();
  const [filter, setFilter] = useState("all");
  const [actionMsg, setActionMsg] = useState("");

  const filtered = stallRequests.filter(r => filter === "all" || r.status === filter);

  const handleApprove = (id) => {
    approveStallRequest(id);
    setActionMsg("Stall request APPROVED. Stall status updated to OCCUPIED and exhibitor notified.");
    setTimeout(() => setActionMsg(""), 4000);
  };

  const handleReject = (id) => {
    rejectStallRequest(id);
    setActionMsg("Stall request REJECTED. Stall marked back to AVAILABLE.");
    setTimeout(() => setActionMsg(""), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Exhibitor Stall Allocation Requests
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review and approve booth requests submitted by equipment makers and OEM exhibitors.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {["all", "pending", "approved", "rejected"].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                filter === st 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {actionMsg && (
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMsg}</span>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card divide-y divide-slate-100 overflow-hidden text-xs">
          {filtered.map(req => {
            const exhibition = exhibitions.find(e => e.id === req.exhibition_id);
            return (
              <div key={req.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-black text-base text-slate-900">{req.company_name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                      Stall {req.stall_number} (Hall {req.hall_code})
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-slate-500 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exhibition?.name || "Manufacturing Expo Mumbai"}</span>
                    <span>•</span>
                    <span>Requested Size: {req.requested_size}</span>
                  </p>

                  <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                    "{req.notes}"
                  </p>

                  <span className="text-[10px] text-slate-400 block pt-1">
                    Submitted on {new Date(req.requested_at).toLocaleString()}
                  </span>
                </div>

                {req.status === 'pending' && (
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Assign</span>
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Request</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Send}
          title="No stall requests found"
          description="There are currently no stall requests matching this filter status."
        />
      )}
    </div>
  );
}
