import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LayoutDashboard, Bell, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function UserAvatarMenu() {
  const { currentUser, currentRole, logout } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  // Compute initials avatar fallback
  const getInitials = (name) => {
    if (!name) return 'EX';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(currentUser.full_name || currentUser.company_name);

  // Navigation paths based on role
  const getProfilePath = () => {
    if (currentRole === 'exhibitor') return '/exhibitor/profile';
    if (currentRole === 'buyer') return '/buyer/profile';
    return '/organizer/dashboard';
  };

  const getDashboardPath = () => {
    if (currentRole === 'organizer') return '/organizer/dashboard';
    if (currentRole === 'exhibitor') return '/exhibitor/dashboard';
    return '/buyer/dashboard';
  };

  const getNotificationsPath = () => {
    if (currentRole === 'exhibitor') return '/exhibitor/notifications';
    if (currentRole === 'buyer') return '/buyer/notifications';
    return '/organizer/dashboard';
  };

  const userNotifs = notifications.filter(n => !n.role || n.role === currentRole);
  const unreadCount = userNotifs.filter(n => !n.is_read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        aria-label="User menu"
      >
        {currentUser.avatar_url ? (
          <img
            src={currentUser.avatar_url}
            alt={currentUser.full_name || currentUser.company_name}
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
            onError={(e) => {
              // Fallback to initials if image fails
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        <div
          style={{ display: currentUser.avatar_url ? 'none' : 'flex' }}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-blue-900 text-white font-bold text-xs items-center justify-center border-2 border-white shadow-xs"
        >
          {initials}
        </div>

        <div className="hidden lg:block text-left pr-1">
          <span className="block text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
            {currentUser.full_name || currentUser.company_name}
          </span>
          <span className="block text-[10px] text-slate-500 font-semibold capitalize">
            {currentRole}
          </span>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900 truncate">
              {currentUser.full_name || currentUser.company_name}
            </p>
            <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              <Shield className="w-3 h-3 text-blue-600" />
              <span>{currentRole} account</span>
            </div>
          </div>

          {/* Menu Links */}
          <div className="py-1">
            <Link
              to={getProfilePath()}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile</span>
            </Link>

            <Link
              to={getDashboardPath()}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              to={getNotificationsPath()}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="pt-1 border-t border-slate-100">
            <button
              onClick={() => {
                setOpen(false);
                logout();
                navigate('/');
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
