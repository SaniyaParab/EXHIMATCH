import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function MobileBottomCTA() {
  const navigate = useNavigate();
  const { executeAIMatching, buyerRequirement } = useData();

  const handleAction = async () => {
    await executeAIMatching(buyerRequirement);
    navigate('/buyer/results');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl md:hidden animate-in slide-in-from-bottom-4 duration-200">
      <button
        onClick={handleAction}
        className="w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 transition-all"
        style={{ minHeight: '44px' }}
      >
        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
        <span>Find My Matches</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
