import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function OrganizerExhibitorApplications() {
  const { exhibitors } = useData();

  const [applications, setApplications] = useState([
    { id: "app-1", exhibitor_id: "exh-comp-4", company_name: "Apex Laser Systems", city: "Ahmedabad", category: "Industrial Machinery", status: "pending", requested_hall: "Hall A" },
    { id: "app-2", exhibitor_id: "exh-comp-6", company_name: "Titan Robotic Arms", city: "Bengaluru", category: "Industrial Automation", status: "approved", requested_hall: "Hall B" },
    { id: "app-3", exhibitor_id: "exh-comp-7", company_name: "Zenith Hydraulics & Presses", city: "Coimbatore", category: "Manufacturing", status: "pending", requested_hall: "Hall A" },
    { id: "app-4", exhibitor_id: "exh-comp-8", company_name: "Paramount Pack Systems", city: "Pune", category: "Packaging", status: "approved", requested_hall: "Hall C" }
  ]);

  const [statusMsg, setStatusMsg] = useState("");

  const handleUpdate = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setStatusMsg(`Application ${newStatus.toUpperCase()} successfully.`);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Exhibitor Participation Applications
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Review company credentials, machinery profiles, and approve exhibitor booth admissions.
        </p>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card divide-y divide-slate-100 overflow-hidden text-xs">
        {applications.map(app => (
          <div key={app.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900">{app.company_name}</h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                  app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {app.status}
                </span>
              </div>
              <p className="text-slate-500">
                {app.category} • Headquartered in {app.city} • Preferred: {app.requested_hall}
              </p>
            </div>

            {app.status === 'pending' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(app.id, 'approved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleUpdate(app.id, 'rejected')}
                  className="px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-bold text-xs"
                >
                  Reject
                </button>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-400 capitalize">
                Processed ({app.status})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
