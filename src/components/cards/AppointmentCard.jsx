import React from 'react';
import { Calendar, Clock, MapPin, Store, Building2, User, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export default function AppointmentCard({ appointment, onCancel, showRoleSpecificActions = true }) {
  const { exhibitors, exhibitions, stalls, products } = useData();

  const exhibitor = exhibitors.find(e => e.id === appointment.exhibitor_id);
  const exhibition = exhibitions.find(ex => ex.id === appointment.exhibition_id);
  const stall = stalls.find(s => s.id === appointment.stall_id);
  const product = products.find(p => p.id === appointment.product_id);

  const statusStyles = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
    rescheduled: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4 hover:shadow-card-hover transition-all">
      {/* Top Header: Booking ID & Status */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
              {appointment.booking_id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${statusStyles[appointment.status] || statusStyles.confirmed}`}>
              {appointment.status}
            </span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 mt-2">
            {exhibitor?.company_name || "Exhibitor Meeting"}
          </h4>
        </div>

        {stall && (
          <div className="text-right">
            <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-900 font-black text-xs block">
              Stall {stall.stall_number}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Hall {stall.hall_code}
            </span>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-800">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-600 shrink-0" />
          <span className="font-semibold text-slate-800">{appointment.time_slot}</span>
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{exhibition?.name} ({exhibition?.venue || "Exhibition Centre"})</span>
        </div>
      </div>

      {/* Product & Purpose */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
        <div className="flex justify-between font-medium">
          <span className="text-slate-500">Discussion Product:</span>
          <span className="font-bold text-slate-900">{product?.name || "Machinery Inquiry"}</span>
        </div>
        {appointment.purpose && (
          <div className="text-slate-600 pt-1 text-[11px] leading-relaxed">
            <span className="font-semibold text-slate-700">Agenda: </span>
            {appointment.purpose}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to={`/buyer/map/${appointment.exhibition_id || 'exh-1'}${stall?.stall_number ? `?stall=${stall.stall_number}` : ''}`}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>View on Floor Map</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {showRoleSpecificActions && appointment.status === 'confirmed' && (
          <button
            onClick={() => onCancel && onCancel(appointment.id)}
            className="text-xs text-slate-400 hover:text-red-600 font-semibold transition-colors"
          >
            Cancel Slot
          </button>
        )}
      </div>
    </div>
  );
}
