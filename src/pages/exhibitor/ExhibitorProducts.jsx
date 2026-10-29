import React, { useState } from 'react';
import { Package, Plus, Edit3, Trash2, X, Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/cards/ProductCard';

export default function ExhibitorProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();

  // Filter products for ABC Machinery
  const myProducts = products.filter(p => p.exhibitor_id === "exh-comp-1");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Industrial Machinery",
    description: "",
    price_min: 1500000,
    price_max: 2500000,
    moq: 1,
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Laser Power": "4000W Maxphotonics",
      "Table Size": "1500 x 3000 mm",
      "Repeatability": "±0.02 mm"
    }
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      category: "Industrial Machinery",
      description: "",
      price_min: 1500000,
      price_max: 2500000,
      moq: 1,
      image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      specifications: {
        "Laser Power": "4000W Maxphotonics",
        "Table Size": "1500 x 3000 mm"
      }
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setForm({
      name: prod.name,
      category: prod.category,
      description: prod.description,
      price_min: prod.price_min,
      price_max: prod.price_max,
      moq: prod.moq || 1,
      image_url: prod.image_url,
      specifications: prod.specifications || {}
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, form);
      setSuccessMsg("Product updated successfully and synced with AI matching engine!");
    } else {
      addProduct({
        ...form,
        exhibitor_id: "exh-comp-1"
      });
      setSuccessMsg("New product added to catalog!");
    }
    setModalOpen(false);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this machine from your catalog?")) {
      deleteProduct(id);
      setSuccessMsg("Product deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Machinery & Product Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your industrial machinery specifications, pricing, and live exhibition demos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Machine</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts.map(prod => (
          <ProductCard
            key={prod.id}
            product={prod}
            isExhibitorOwner={true}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingProduct ? "Edit Machinery Specifications" : "Add New Machinery to Catalog"}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product / Machine Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. CNC Fiber Laser Cutting Machine 6kW"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Industrial Machinery">Industrial Machinery</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Industrial Automation">Industrial Automation</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Minimum Order Qty</label>
                  <input
                    type="number"
                    value={form.moq}
                    onChange={(e) => setForm({ ...form, moq: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price Min (INR) *</label>
                  <input
                    type="number"
                    value={form.price_min}
                    onChange={(e) => setForm({ ...form, price_min: Number(e.target.value) })}
                    required
                    step="50000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    ₹{(form.price_min / 100000).toFixed(1)} Lakhs
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price Max (INR) *</label>
                  <input
                    type="number"
                    value={form.price_max}
                    onChange={(e) => setForm({ ...form, price_max: Number(e.target.value) })}
                    required
                    step="50000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    ₹{(form.price_max / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detail machine bed rigidity, laser source, autofocus heads, cutting speed..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                >
                  {editingProduct ? "Save Changes" : "Publish Machine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
