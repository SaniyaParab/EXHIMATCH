import React, { useState } from 'react';
import { CalendarCheck, Clock, Store, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AppointmentCard from '../../components/cards/AppointmentCard';
import EmptyState from '../../components/common/EmptyState';

export default function ExhibitorAppointments() {
  const { appointments } = useData();
  const [filter, setFilter] = useState("all");

  const myAppointments = appointments.filter(a => a.exhibitor_id === "exh-comp-1" || a.stall_id === "stall-A-A24");
  const filtered = myAppointments.filter(a => filter === "all" || a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Trade Fair Appointments (Stall A24)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed buyer meetings scheduled during Manufacturing Expo Mumbai 2026.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {["all", "confirmed", "completed", "cancelled"].map(st => (
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(app => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarCheck}
          title="No appointments scheduled"
          description="Appointments booked by buyers through ExhiMatch AI will appear here."
        />
      )}
    </div>
  );
}
