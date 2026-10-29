import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Sparkles,
  Building2,
  Store,
  Map,
  CalendarCheck,
  Bookmark,
  Bell,
  User,
  Package,
  FilePlus,
  Send,
  BarChart3,
  Users,
  Layers,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Sidebar({ isOpen, onClose }) {
  const { currentRole, currentUser, logout, switchDemoRole } = useAuth();
  const { notifications, appointments, leads, stallRequests } = useData();
  const navigate = useNavigate();

  // Badge calculations
  const unreadNotifs = notifications.filter(n => !n.is_read && (!n.role || n.role === currentRole)).length;
  const buyerUpcomingApps = appointments.filter(a => a.status === 'confirmed').length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const pendingRequestsCount = stallRequests.filter(r => r.status === 'pending').length;

  const buyerNavItems = [
    { name: "Dashboard", path: "/buyer/dashboard", icon: LayoutDashboard },
    { name: "Find Suppliers (AI)", path: "/buyer/discover", icon: Search, badge: "AI" },
    { name: "Match Results", path: "/buyer/results", icon: Sparkles },
    { name: "Recommended Shows", path: "/buyer/exhibitions", icon: Building2 },
    { name: "Top Stalls", path: "/buyer/stalls", icon: Store },
    { name: "Floor Map", path: "/buyer/map/exh-1", icon: Map },
    { name: "My Appointments", path: "/buyer/appointments", icon: CalendarCheck, count: buyerUpcomingApps },
    { name: "Saved Items", path: "/buyer/saved", icon: Bookmark },
    { name: "My Profile", path: "/buyer/profile", icon: User },
    { name: "Notifications", path: "/buyer/notifications", icon: Bell, count: unreadNotifs },
  ];

  const exhibitorNavItems = [
    { name: "Dashboard", path: "/exhibitor/dashboard", icon: LayoutDashboard },
    { name: "Company Profile", path: "/exhibitor/profile", icon: Building2 },
    { name: "Products & Machinery", path: "/exhibitor/products", icon: Package },
    { name: "My Exhibitions", path: "/exhibitor/exhibitions", icon: Layers },
    { name: "Apply for Show", path: "/exhibitor/apply", icon: Send },
    { name: "My Assigned Stall", path: "/exhibitor/stall", icon: Store },
    { name: "Request Stall", path: "/exhibitor/stall/request", icon: FilePlus },
    { name: "Appointments", path: "/exhibitor/appointments", icon: CalendarCheck },
    { name: "Qualified Leads (CRM)", path: "/exhibitor/leads", icon: Inbox, count: newLeadsCount },
    { name: "Analytics & ROI", path: "/exhibitor/analytics", icon: BarChart3 },
    { name: "Notifications", path: "/exhibitor/notifications", icon: Bell, count: unreadNotifs },
  ];

  const organizerNavItems = [
    { name: "Dashboard", path: "/organizer/dashboard", icon: LayoutDashboard },
    { name: "Organizer Profile", path: "/organizer/profile", icon: User },
    { name: "Manage Exhibitions", path: "/organizer/exhibitions", icon: Building2 },
    { name: "Create Exhibition", path: "/organizer/exhibitions/create", icon: FilePlus },
    { name: "Halls & Layouts", path: "/organizer/halls", icon: Layers },
    { name: "Stall Allocations", path: "/organizer/stalls", icon: Store },
    { name: "Stall Requests", path: "/organizer/stall-requests", icon: Send, count: pendingRequestsCount },
    { name: "Exhibitor Applications", path: "/organizer/exhibitors", icon: Users },
    { name: "Trade Appointments", path: "/organizer/appointments", icon: CalendarCheck },
    { name: "Lead Conversions", path: "/organizer/leads", icon: TrendingUp },
    { name: "Analytics & Traffic", path: "/organizer/analytics", icon: BarChart3 },
  ];

  const currentNavItems = 
    currentRole === 'organizer' ? organizerNavItems :
    currentRole === 'exhibitor' ? exhibitorNavItems :
    buyerNavItems;

  const roleColors = {
    buyer: "bg-blue-50 text-blue-700 border-blue-200",
    exhibitor: "bg-purple-50 text-purple-700 border-purple-200",
    organizer: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Header */}
          <div className="h-18 px-5 border-b border-slate-200 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  ExhiMatch<span className="text-blue-600">AI</span>
                </span>
              </div>
            </Link>

            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${roleColors[currentRole]}`}>
              {currentRole}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 text-[10px] font-extrabold">
                      {item.badge}
                    </span>
                  )}

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer: User profile summary & logout */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
            {currentUser?.avatar_url ? (
              <img 
                src={currentUser.avatar_url} 
                alt={currentUser?.full_name} 
                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-black text-xs flex items-center justify-center border border-slate-200 shrink-0">
                {(currentUser?.full_name || 'U').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-xs text-slate-900 truncate">
                {currentUser?.full_name || "Guest User"}
              </h5>
              <p className="text-[10px] text-slate-500 truncate">
                {currentUser?.company_name || currentUser?.email}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
