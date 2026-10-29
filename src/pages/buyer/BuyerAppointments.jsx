import React, { useState } from 'react';
import { Calendar, Clock, Store, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../../context/DataContext';
import AppointmentCard from '../../components/cards/AppointmentCard';
import EmptyState from '../../components/common/EmptyState';

export default function BuyerAppointments() {
  const { appointments, cancelAppointment } = useData();
  const [filter, setFilter] = useState("all");

  const handleCancelAppointment = (id) => {
    const res = cancelAppointment(id);
    if (res?.success) {
      toast.success("Appointment slot cancelled successfully.");
    } else {
      toast.error(res?.error || "Failed to cancel appointment.");
    }
  };

  const filtered = appointments.filter(a => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            My Booth Appointments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed trade fair demonstration slots and technical meetings with equipment suppliers.
          </p>
        </div>

        {/* Status filters */}
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
            <AppointmentCard 
              key={app.id} 
              appointment={app} 
              onCancel={handleCancelAppointment} 
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No appointments found"
          description="You haven't scheduled any booth demonstration meetings yet. Browse recommended stalls and book a demo slot."
          actionText="Find Matching Stalls"
          actionPath="/buyer/results"
        />
      )}
    </div>
  );
}
