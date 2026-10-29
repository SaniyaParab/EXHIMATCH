import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { 
  Building2, 
  Save, 
  Edit3, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Camera, 
  Calendar, 
  Layers, 
  Users, 
  CheckCircle2, 
  Award, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ProfilePhotoModal from '../../components/common/ProfilePhotoModal';

const organizerProfileSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  company_name: z.string().min(2, "Organization name is required"),
  job_role: z.string().min(2, "Designation is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  website: z.string().url("Must be a valid URL").or(z.string().length(0)).optional(),
  about: z.string().min(10, "About section should be at least 10 characters"),
  business_category: z.string().min(2, "Exhibition category is required"),
});

export default function OrganizerProfile() {
  const { currentUser, updateProfile } = useAuth();
  const { exhibitions } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&q=80"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(organizerProfileSchema),
    defaultValues: {
      full_name: currentUser?.full_name || "Sunil Verma",
      company_name: currentUser?.company_name || "Maharashtra Industrial Trade Expos (MITE)",
      job_role: currentUser?.job_role || "Chief Exhibition Director",
      email: currentUser?.email || "sunil@mahaexpo.com",
      phone: currentUser?.phone || "+91 99300 11223",
      city: currentUser?.city || "Mumbai",
      state: currentUser?.state || "Maharashtra",
      country: currentUser?.country || "India",
      website: currentUser?.website || "https://mahaexpo.example.com",
      about: currentUser?.about || "Organizers of premier global industrial exhibitions across Mumbai, Pune, and Gujarat. Specializing in engineering, CNC machinery, and smart factory trade fairs.",
      business_category: currentUser?.business_category || "Trade Fair & Exhibition Management"
    }
  });

  const getInitials = (name) => {
    if (!name) return 'SV';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      avatar_url: avatarUrl
    };

    const result = await updateProfile(payload);
    if (result.success) {
      setIsEditing(false);
      toast.success("Organizer Profile updated successfully!");
    } else {
      toast.error(result.error || "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    reset();
    setAvatarUrl(currentUser?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&q=80");
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Organizer Profile
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your exhibition house branding, contact details, and organization preferences.
          </p>
        </div>

        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Profile Card */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6 text-xs">
        
        {/* Profile Header & Photo Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Organizer avatar"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-slate-200 shadow-sm">
                {getInitials(currentUser?.full_name)}
              </div>
            )}

            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="absolute -bottom-2 -right-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md transition-transform hover:scale-110"
              title="Edit Profile Photo / Logo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {currentUser?.company_name || "Exhibition Organization"}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase">
                Verified Organizer
              </span>
            </div>

            <p className="text-slate-600 font-semibold">
              {currentUser?.full_name} &bull; <span className="text-slate-500">{currentUser?.job_role || "Organizer Director"}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-slate-500 text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentUser?.city || "Mumbai"}, {currentUser?.state || "Maharashtra"}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser?.email}
              </span>
              {currentUser?.website && (
                <a 
                  href={currentUser.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Organizer Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 block">{exhibitions.length || 3}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Shows</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 block">450+</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Exhibitors</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 block">98.4%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Stall Match Index</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Organization & Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Organizer Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('full_name')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.full_name && <p className="text-red-500 text-[10px] mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Organization / Trade House Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('company_name')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.company_name && <p className="text-red-500 text-[10px] mt-1">{errors.company_name.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Designation / Role</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('job_role')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.job_role && <p className="text-red-500 text-[10px] mt-1">{errors.job_role.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Exhibition Category / Focus</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('business_category')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.business_category && <p className="text-red-500 text-[10px] mt-1">{errors.business_category.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                {...register('email')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Contact Phone</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('phone')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('city')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">State</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('state')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.state && <p className="text-red-500 text-[10px] mt-1">{errors.state.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Country</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('country')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.country && <p className="text-red-500 text-[10px] mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Website URL</label>
            <input
              type="text"
              disabled={!isEditing}
              {...register('website')}
              placeholder="https://example.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {errors.website && <p className="text-red-500 text-[10px] mt-1">{errors.website.message}</p>}
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Organization</label>
            <textarea
              rows={4}
              disabled={!isEditing}
              {...register('about')}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {errors.about && <p className="text-red-500 text-[10px] mt-1">{errors.about.message}</p>}
          </div>
        </div>

        {/* Save Bar if Editing */}
        {isEditing && (
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "Saving Profile..." : "Save Changes"}</span>
            </button>
          </div>
        )}
      </form>

      {/* Profile Photo / Logo Edit Modal */}
      <ProfilePhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentImageUrl={avatarUrl}
        onImageChange={(newUrl) => {
          setAvatarUrl(newUrl);
          updateProfile({ avatar_url: newUrl });
          toast.success("Profile photo updated!");
        }}
        title="Update Organizer Photo / Logo"
      />
    </div>
  );
}
