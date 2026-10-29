import React, { useState } from 'react';
import { Menu, Search, Bot, Bell, CheckCircle2, User, Building2, Shield, Sparkles, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import AIAssistantModal from './AIAssistantModal';

export default function DashboardHeader({ onMenuClick, title, subtitle }) {
  const { currentUser, currentRole, switchDemoRole, logout } = useAuth();
  const { notifications, markNotificationRead, clearAllNotifications, products, exhibitors, exhibitions } = useData();
  const navigate = useNavigate();

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter notifications for current user/role
  const userNotifs = notifications.filter(n => !n.role || n.role === currentRole);
  const unreadCount = userNotifs.filter(n => !n.is_read).length;

  // Global search matching
  const searchResults = searchQuery.trim().length > 1 ? {
    products: products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    exhibitors: exhibitors.filter(e => e.company_name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2),
    exhibitions: exhibitions.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2),
  } : null;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              {title || "Dashboard"}
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.2 rounded-full border hidden sm:inline-flex ${
                currentRole === 'buyer' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                currentRole === 'exhibitor' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {currentRole} portal
              </span>
            </h1>
            {subtitle && (
              <p className="text-[11px] text-slate-500 hidden md:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search CNC, laser, suppliers, expos..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchFocused && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 text-xs animate-in fade-in">
              {/* Products */}
              {searchResults.products.length > 0 && (
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Products</span>
                  {searchResults.products.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => navigate(`/buyer/results`)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800 truncate">{p.name}</span>
                      <span className="text-blue-600 font-bold shrink-0">₹{(p.price_min/100000).toFixed(0)}L</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Exhibitors */}
              {searchResults.exhibitors.length > 0 && (
                <div className="mb-2 pt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Exhibitors</span>
                  {searchResults.exhibitors.map(e => (
                    <div 
                      key={e.id}
                      onClick={() => navigate(`/buyer/exhibitor/${e.id}`)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800">{e.company_name}</span>
                      <span className="text-slate-500 text-[11px]">{e.city}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Exhibitions */}
              {searchResults.exhibitions.length > 0 && (
                <div className="pt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Exhibitions</span>
                  {searchResults.exhibitions.map(ex => (
                    <div 
                      key={ex.id}
                      onClick={() => navigate(`/buyer/exhibition/${ex.id}`)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800">{ex.name}</span>
                      <span className="text-slate-500 text-[11px]">{ex.city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Ask AI Assistant */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="hidden sm:inline">ExhiMatch AI</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in duration-150">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Notifications</h4>
                      <p className="text-[10px] text-slate-500">{unreadCount} unread updates</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => clearAllNotifications(currentUser?.user_id)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {userNotifs.length > 0 ? (
                      userNotifs.slice(0, 6).map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) {
                              setNotifOpen(false);
                              navigate(n.link);
                            }
                          }}
                          className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${!n.is_read ? 'bg-blue-50/40' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                            {!n.is_read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1.5 block">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications yet.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar */}
          <Link
            to={currentRole === 'buyer' ? '/buyer/profile' : currentRole === 'exhibitor' ? '/exhibitor/profile' : '/organizer/profile'}
            className="flex items-center gap-2 pl-2 border-l border-slate-200"
          >
            {currentUser?.avatar_url ? (
              <img
                src={currentUser.avatar_url}
                alt={currentUser?.full_name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-200">
                {(currentUser?.full_name || 'U').slice(0, 2).toUpperCase()}
              </div>
            )}
          </Link>
        </div>
      </header>

      {/* ExhiMatch AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </>
  );
}
