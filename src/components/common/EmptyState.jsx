import React from 'react';
import { Inbox, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title = "No items found", 
  description = "There are no records matching your current filter.", 
  actionText, 
  actionPath, 
  onAction 
}) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-md mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-extrabold text-base text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-6">{description}</p>

      {actionText && (
        actionPath ? (
          <Link
            to={actionPath}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )
      )}
    </div>
  );
}
