import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Building2, Phone, MapPin, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer"); // 'buyer', 'exhibitor', or 'organizer'
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register({
      email,
      password,
      fullName,
      companyName,
      role,
      phone,
      city
    });

    setLoading(false);
    if (result.success) {
      if (role === 'organizer') navigate('/organizer/dashboard');
      else if (role === 'exhibitor') navigate('/exhibitor/dashboard');
      else navigate('/buyer/dashboard');
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12 bg-slate-50">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create an ExhiMatch AI Account
          </h2>
          <p className="text-xs text-slate-500">
            Join India's advanced B2B exhibition matching network.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              role === "buyer" 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Buyer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("exhibitor")}
            className={`py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              role === "exhibitor" 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Exhibitor</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("organizer")}
            className={`py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              role === "organizer" 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Organizer</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="e.g. Precision Fab Pvt Ltd"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Business Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="rajesh@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+91 98201 00000"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">City / Location</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Mumbai"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              role === 'organizer' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' :
              role === 'exhibitor' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20' :
              'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
            } text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4`}
          >
            <span>{loading ? "Creating Account..." : `Complete ${role.charAt(0).toUpperCase() + role.slice(1)} Registration`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
