import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Calendar, MapPin, Layers, CheckCircle2, ArrowLeft, Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function OrganizerExhibitionsCreate() {
  const { createExhibition } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    venue: "Bombay Exhibition Centre (NESCO), Goregaon East",
    city: "Mumbai",
    state: "Maharashtra",
    start_date: "2027-04-10",
    end_date: "2027-04-13",
    categories: ["Industrial Machinery", "Manufacturing"],
    banner_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80"
  });

  const availableCategories = [
    "Industrial Machinery",
    "Manufacturing",
    "Automotive",
    "Industrial Automation",
    "Construction",
    "Packaging",
    "Electronics",
    "Logistics"
  ];

  const handleCategoryToggle = (cat) => {
    setForm(prev => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createExhibition(form);
    navigate('/organizer/exhibitions');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link to="/organizer/exhibitions" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Exhibitions</span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create New B2B Trade Exhibition
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Launch a new exhibition. ExhiMatch AI will automatically generate Hall layouts and booth spaces ready for allocation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-5 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Exhibition Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Pune International AutoTech Expo 2027"
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            placeholder="e.g. Western India's Premier Auto Tooling & Robotics Fair"
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Venue / Fairground *</label>
            <input
              type="text"
              required
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">City *</label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Start Date *</label>
            <input
              type="date"
              required
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">End Date *</label>
            <input
              type="date"
              required
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1.5">Focus Industry Sectors</label>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map(cat => {
              const sel = form.categories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    sel ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Exhibition Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Provide a comprehensive profile of exhibitors, attendee profiles, and featured machinery halls..."
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Banner Image URL</label>
          <input
            type="url"
            value={form.banner_image}
            onChange={(e) => setForm({ ...form, banner_image: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <Link
            to="/organizer/exhibitions"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
          >
            Publish Exhibition & Generate Halls
          </button>
        </div>
      </form>
    </div>
  );
}
