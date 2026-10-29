import React from 'react';

export default function LoadingSkeleton({ type = "card", count = 3 }) {
  const items = Array.from({ length: count });

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
            <div className="h-40 bg-slate-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
            <div className="h-8 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 rounded-xl" />
      ))}
    </div>
  );
}
