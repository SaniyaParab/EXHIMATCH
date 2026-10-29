import React from 'react';
import { CalendarCheck, Store, Building2, User, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AppointmentCard from '../../components/cards/AppointmentCard';

export default function OrganizerAppointments() {
  const { appointments } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Exhibition B2B Appointments
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Central register of all scheduled buyer-exhibitor booth appointments across trade fair dates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map(app => (
          <AppointmentCard key={app.id} appointment={app} showRoleSpecificActions={false} />
        ))}
      </div>
    </div>
  );
}
