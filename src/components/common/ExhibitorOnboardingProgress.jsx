import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Package, Layers, Store, Clock, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ExhibitorOnboardingProgress({ currentStep = 1 }) {
  const { stallRequests, products, exhibitors } = useData();
  const exhibitor = exhibitors[0];

  // Compute status of steps
  const hasCompanyDetails = Boolean(exhibitor?.company_name && exhibitor?.email);
  const hasProducts = products.some(p => p.exhibitor_id === exhibitor?.id);
  const myRequests = stallRequests.filter(r => r.exhibitor_id === exhibitor?.id);
  const hasStallRequest = myRequests.length > 0;
  const isApproved = myRequests.some(r => r.status === 'approved');
  const isPending = myRequests.some(r => r.status === 'pending');

  const steps = [
    { number: 1, title: "Company", path: "/exhibitor/profile", isComplete: hasCompanyDetails, icon: Building2 },
    { number: 2, title: "Products", path: "/exhibitor/products", isComplete: hasProducts, icon: Package },
    { number: 3, title: "Exhibition", path: "/exhibitor/apply", isComplete: hasStallRequest, icon: Layers },
    { number: 4, title: "Stall Request", path: "/exhibitor/stall/request", isComplete: hasStallRequest, icon: Store },
    { number: 5, title: "Approval", path: "/exhibitor/stall", isComplete: isApproved, isCurrent: isPending, icon: Clock },
    { number: 6, title: "Confirmed", path: "/exhibitor/stall", isComplete: isApproved, icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <Store className="w-4 h-4 text-purple-600" />
          Exhibitor Onboarding & Stall Allocation Status
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          6-Step Progress
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.number === currentStep;

          return (
            <Link
              key={step.number}
              to={step.path}
              className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm ring-2 ring-purple-600/20'
                  : step.isComplete
                  ? 'bg-emerald-50/80 text-emerald-950 border-emerald-200 hover:bg-emerald-100/60'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  isActive ? 'bg-white text-purple-700' :
                  step.isComplete ? 'bg-emerald-600 text-white' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {step.isComplete ? '✓' : step.number}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : step.isComplete ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>

              <div>
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </p>
                <p className={`text-[9px] font-semibold truncate ${
                  isActive ? 'text-purple-100' :
                  step.isComplete ? 'text-emerald-700' :
                  'text-slate-400'
                }`}>
                  {step.isComplete ? 'Completed' : isActive ? 'Active Step' : 'Pending'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
