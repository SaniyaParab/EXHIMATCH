import React from 'react';
import { Bell, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';

export default function ExhibitorNotifications() {
  const { notifications, markNotificationRead, clearAllNotifications } = useData();
  const { currentRole, currentUser } = useAuth();
  const navigate = useNavigate();

  const userNotifs = notifications.filter(n => !n.role || n.role === 'exhibitor');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Exhibitor Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            New qualified leads, stall allocation approvals, and buyer appointments.
          </p>
        </div>

        {userNotifs.length > 0 && (
          <button
            onClick={() => clearAllNotifications(currentUser?.user_id)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      {userNotifs.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card divide-y divide-slate-100 overflow-hidden text-xs">
          {userNotifs.map(n => (
            <div 
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`p-5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-4 ${
                !n.is_read ? 'bg-purple-50/30' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">{n.title}</h4>
                  <span className="text-[11px] text-slate-400">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{n.message}</p>
              </div>

              {!n.is_read && (
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up with your exhibitor booth updates."
        />
      )}
    </div>
  );
}
