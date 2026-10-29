import React from 'react';
import { Package, ShieldCheck, Tag, ExternalLink, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProductCard({ product, onSelect, onEdit, onDelete, isExhibitorOwner = false }) {
  const { exhibitors, stalls } = useData();
  const exhibitor = exhibitors.find(e => e.id === product.exhibitor_id);
  const stall = stalls.find(s => s.current_exhibitor_id === product.exhibitor_id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      {/* Product Image */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img 
          src={product.image_url || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
            {product.category}
          </span>
        </div>

        {stall && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-600/90 backdrop-blur-md text-white shadow-xs">
              Live Demo: Stall {stall.stall_number}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h4>
          
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing & MOQ */}
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Price Range</span>
              <span className="font-extrabold text-blue-600 text-sm">
                ₹{(product.price_min / 100000).toFixed(1)}L – ₹{(product.price_max / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">MOQ</span>
              <span className="font-bold text-slate-700">{product.moq || 1} Unit</span>
            </div>
          </div>

          {/* Specifications Chips */}
          {product.specifications && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {Object.entries(product.specifications).slice(0, 2).map(([k, v], idx) => (
                <span key={idx} className="px-1.5 py-0.5 bg-slate-50 rounded text-[10px] text-slate-600 border border-slate-100">
                  {k}: <strong>{v}</strong>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100">
          {isExhibitorOwner ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onEdit && onEdit(product)}
                className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(product.id)}
                className="py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 font-bold text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSelect && onSelect(product)}
              className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Inquire & Schedule Demo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
