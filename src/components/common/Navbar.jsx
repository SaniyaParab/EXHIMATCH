import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Layers, Search, Bot, LogIn, UserPlus, Menu, X, ArrowRight, Shield, User, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AIAssistantModal from './AIAssistantModal';

export default function Navbar() {
  const { currentUser, currentRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Exhibitions", path: "/exhibitions" },
    { name: "About", path: "/about" },
  ];

  const getDashboardPath = () => {
    if (currentRole === 'organizer') return '/organizer/dashboard';
    if (currentRole === 'exhibitor') return '/exhibitor/dashboard';
    return '/buyer/dashboard';
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  ExhiMatch<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block -mt-1">
                  B2B Exhibition Matching
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* AI Assistant Button */}
              <button
                onClick={() => setAiModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Bot className="w-4 h-4 text-purple-600" />
                <span>Ask AI</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-200 text-purple-900 text-[10px] font-extrabold">NEW</span>
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    to={getDashboardPath()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all"
                  >
                    <span>Dashboard ({currentRole.toUpperCase()})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={logout}
                    className="text-xs text-slate-500 hover:text-slate-900 font-semibold px-2 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setAiModalOpen(true)}
                className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200"
              >
                <Bot className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              {currentUser ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    Go to {currentRole.toUpperCase()} Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-xs text-slate-500 font-semibold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-4 text-center rounded-xl font-bold text-xs border border-slate-200 text-slate-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-4 text-center rounded-xl font-bold text-xs bg-blue-600 text-white"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ExhiMatch AI Assistant Modal */}
      <AIAssistantModal 
        isOpen={aiModalOpen} 
        onClose={() => setAiModalOpen(false)} 
      />
    </>
  );
}
