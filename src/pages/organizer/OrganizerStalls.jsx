import React, { useState } from 'react';
import { Store, Layers, Filter, CheckCircle2, Search, Map } from 'lucide-react';
import { useData } from '../../context/DataContext';
import InteractiveFloorMap from '../../components/common/InteractiveFloorMap';

export default function OrganizerStalls() {
  const { stalls, exhibitions, exhibitors } = useData();

  const [activeExhId, setActiveExhId] = useState("exh-1");
  const [selectedHall, setSelectedHall] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("map"); // "map" or "table"

  const exhStalls = stalls.filter(s => s.exhibition_id === activeExhId);

  const filteredStalls = exhStalls.filter(s => {
    const matchesHall = selectedHall === "all" || s.hall_code === selectedHall;
    const matchesStatus = selectedStatus === "all" || s.status === selectedStatus;
    const matchesSearch = s.stall_number.toLowerCase().includes(search.toLowerCase());
    return matchesHall && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Floor Allocations & Stall Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visual floor layout control and booth occupancy across Hall A, Hall B, and Hall C.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode("map")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "map" ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "table" ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Table Directory</span>
          </button>
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Hall:</span>
          <select
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 rounded-lg font-semibold border border-slate-200 text-slate-800"
          >
            <option value="all">All Halls</option>
            <option value="A">Hall A (Machinery)</option>
            <option value="B">Hall B (Automation)</option>
            <option value="C">Hall C (Tooling)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 rounded-lg font-semibold border border-slate-200 text-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="w-48">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stall # (e.g. A24)"
            className="w-full px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-slate-800"
          />
        </div>
      </div>

      {viewMode === "map" ? (
        <InteractiveFloorMap
          exhibitionId={activeExhId}
          highlightStallNumber="A24"
        />
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3.5 pl-6">Stall #</th>
                  <th className="p-3.5">Hall</th>
                  <th className="p-3.5">Dimensions</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Allocated Company</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStalls.map(stall => {
                  const exhibitor = exhibitors.find(e => e.id === stall.current_exhibitor_id);
                  return (
                    <tr key={stall.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-extrabold text-slate-900">{stall.stall_number}</td>
                      <td className="p-3.5">Hall {stall.hall_code}</td>
                      <td className="p-3.5 font-medium">{stall.size}</td>
                      <td className="p-3.5">{stall.category}</td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {exhibitor?.company_name || <span className="text-slate-400 font-normal">Unassigned</span>}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          stall.status === 'occupied' ? 'bg-blue-100 text-blue-800' :
                          stall.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {stall.status}
                        </span>
                      </td>
                      <td className="p-3.5 pr-6 font-semibold text-blue-600">
                        ₹{(stall.base_price || 85000).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
