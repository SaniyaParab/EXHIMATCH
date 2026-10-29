import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function NotFoundPage() {
  const { currentRole } = useAuth();

  const getDashboardPath = () => {
    if (currentRole === 'organizer') return '/organizer/dashboard';
    if (currentRole === 'exhibitor') return '/exhibitor/dashboard';
    return '/buyer/dashboard';
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <span className="text-3xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Looks like this page left the exhibition.
          </h1>
          <p className="text-xs text-slate-500">
            The page you're looking for doesn't exist or has been moved to another booth.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </Link>

          <Link
            to={getDashboardPath()}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
