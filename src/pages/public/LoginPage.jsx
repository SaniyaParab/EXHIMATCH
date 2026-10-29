import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, UserCheck, Building2, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("rajesh@sharmaindustries.com");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password, role);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'organizer') navigate('/organizer/dashboard');
      else if (result.user.role === 'exhibitor') navigate('/exhibitor/dashboard');
      else navigate('/buyer/dashboard');
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleQuickDemoLogin = (selectedRole) => {
    switchDemoRole(selectedRole);
    if (selectedRole === 'organizer') navigate('/organizer/dashboard');
    else if (selectedRole === 'exhibitor') navigate('/exhibitor/dashboard');
    else navigate('/buyer/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12 bg-slate-50">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome to ExhiMatch AI
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your role-specific dashboard & matching engine.
          </p>
        </div>

        {/* 1-Click Demo Accounts for Judges */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block text-center">
            ⚡ Saved Demo Login Accounts:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setEmail("rajesh@sharmaindustries.com");
                setPassword("password123");
                handleQuickDemoLogin('buyer');
              }}
              className="py-2 px-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold text-center transition-all shadow-xs flex flex-col items-center"
            >
              <UserCheck className="w-4 h-4 mb-0.5" />
              <span>Buyer</span>
              <span className="text-[9px] opacity-80 font-normal truncate max-w-full px-0.5">rajesh@sharmaindustries.com</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("amit@abcmachinery.com");
                setPassword("password123");
                handleQuickDemoLogin('exhibitor');
              }}
              className="py-2 px-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-bold text-center transition-all shadow-xs flex flex-col items-center"
            >
              <Building2 className="w-4 h-4 mb-0.5" />
              <span>Exhibitor</span>
              <span className="text-[9px] opacity-80 font-normal truncate max-w-full px-0.5">amit@abcmachinery.com</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("sunil@mahaexpo.com");
                setPassword("password123");
                handleQuickDemoLogin('organizer');
              }}
              className="py-2 px-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold text-center transition-all shadow-xs flex flex-col items-center"
            >
              <Shield className="w-4 h-4 mb-0.5" />
              <span>Organizer</span>
              <span className="text-[9px] opacity-80 font-normal truncate max-w-full px-0.5">sunil@mahaexpo.com</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Select Persona / Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'buyer', label: 'Buyer' },
                { id: 'exhibitor', label: 'Exhibitor' },
                { id: 'organizer', label: 'Organizer' },
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 rounded-xl font-bold border text-center transition-all ${
                    role === r.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
