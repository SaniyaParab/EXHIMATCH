import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { User, Building2, Mail, Phone, MapPin, Globe, Briefcase, DollarSign, Save, X, Edit3, Camera, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProfilePhotoModal from '../../components/common/ProfilePhotoModal';

// Zod Validation Schema
const buyerProfileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  company_name: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().default("India"),
  business_category: z.string().min(2, "Business category is required"),
  job_role: z.string().min(2, "Job role is required"),
  budget_min: z.coerce.number().min(0, "Minimum budget must be positive"),
  budget_max: z.coerce.number().min(0, "Maximum budget must be positive"),
  preferred_location: z.string().optional(),
  max_travel_distance: z.coerce.number().min(1, "Distance must be at least 1km"),
  website: z.string().url("Must be a valid URL").or(z.string().length(0)).optional(),
  about: z.string().optional(),
});

export default function BuyerProfile() {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar_url || '');
  const [selectedCategories, setSelectedCategories] = useState(
    currentUser?.preferred_categories || ["Industrial Machinery", "Manufacturing"]
  );

  const availableCategories = [
    "Industrial Machinery",
    "Manufacturing",
    "Automotive & OEM",
    "Industrial Automation",
    "Construction & Hardware",
    "Packaging & Printing",
    "Electronics & Semiconductors",
    "Chemicals & Plastics"
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(buyerProfileSchema),
    defaultValues: {
      full_name: currentUser?.full_name || "Rajesh Sharma",
      company_name: currentUser?.company_name || "Sharma Precision Fab Pvt Ltd",
      email: currentUser?.email || "rajesh@sharmaindustries.com",
      phone: currentUser?.phone || "+91 98201 44552",
      city: currentUser?.city || "Mumbai",
      state: currentUser?.state || "Maharashtra",
      country: currentUser?.country || "India",
      business_category: currentUser?.business_category || "Industrial Machinery & Metal Fabrication",
      job_role: currentUser?.job_role || "Managing Director & Head of Procurement",
      budget_min: currentUser?.budget_min || 1500000,
      budget_max: currentUser?.budget_max || 3500000,
      preferred_location: currentUser?.preferred_location || "Mumbai",
      max_travel_distance: currentUser?.max_travel_distance || 200,
      website: currentUser?.website || "https://sharmaprecision.com",
      about: currentUser?.about || "Specialized in high-precision automotive sheet metal stamping and heavy equipment fabrication in Maharashtra."
    }
  });

  const getInitials = (name) => {
    if (!name) return 'RS';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleCategoryToggle = (cat) => {
    if (!isEditing) return;
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      avatar_url: avatarUrl,
      preferred_categories: selectedCategories
    };

    const result = await updateProfile(payload);
    if (result.success) {
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } else {
      toast.error(result.error || "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    reset();
    setAvatarUrl(currentUser?.avatar_url || '');
    setSelectedCategories(currentUser?.preferred_categories || ["Industrial Machinery"]);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Buyer Profile
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
              Verified Buyer
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your company information, procurement requirements, and AI discovery preferences.
          </p>
        </div>

        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6 text-xs">
        
        {/* Large Circular Profile Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Buyer profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-900 to-blue-900 text-white font-extrabold text-2xl flex items-center justify-center border-4 border-slate-100 shadow-md">
                {getInitials(currentUser?.full_name)}
              </div>
            )}

            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform hover:scale-110"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h2 className="text-xl font-black text-slate-900">
              {currentUser?.full_name || "Rajesh Sharma"}
            </h2>
            <p className="font-semibold text-slate-600">
              {currentUser?.job_role || "Managing Director"} • {currentUser?.company_name || "Sharma Precision Fab Pvt Ltd"}
            </p>
            <p className="text-slate-400">
              {currentUser?.city || "Mumbai"}, {currentUser?.state || "Maharashtra"}, {currentUser?.country || "India"}
            </p>
            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* Section 1: Contact & Company Details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Personal & Company Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('full_name')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.full_name && <p className="text-red-500 text-[10px] mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('company_name')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.company_name && <p className="text-red-500 text-[10px] mt-1">{errors.company_name.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Job Role / Designation</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('job_role')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.job_role && <p className="text-red-500 text-[10px] mt-1">{errors.job_role.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Business Category</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('business_category')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.business_category && <p className="text-red-500 text-[10px] mt-1">{errors.business_category.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email</label>
              <input
                type="email"
                disabled={!isEditing}
                {...register('email')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                disabled={!isEditing}
                {...register('phone')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('city')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">State</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('state')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.state && <p className="text-red-500 text-[10px] mt-1">{errors.state.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Country</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('country')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Website URL</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('website')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.website && <p className="text-red-500 text-[10px] mt-1">{errors.website.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Procurement Preferences & AI Parameters */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Match Parameters & Budget Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Min Budget (INR)</label>
              <input
                type="number"
                disabled={!isEditing}
                {...register('budget_min')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.budget_min && <p className="text-red-500 text-[10px] mt-1">{errors.budget_min.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Budget (INR)</label>
              <input
                type="number"
                disabled={!isEditing}
                {...register('budget_max')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.budget_max && <p className="text-red-500 text-[10px] mt-1">{errors.budget_max.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Travel Distance (km)</label>
              <input
                type="number"
                disabled={!isEditing}
                {...register('max_travel_distance')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.max_travel_distance && <p className="text-red-500 text-[10px] mt-1">{errors.max_travel_distance.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Preferred Product Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => {
                const selected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    disabled={!isEditing}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">About Company & Sourcing Goals</label>
            <textarea
              rows={3}
              disabled={!isEditing}
              {...register('about')}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>
        </div>

        {/* Save/Submit Row */}
        {isEditing && (
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Saving..." : "Save Profile"}</span>
            </button>
          </div>
        )}
      </form>

      {/* Photo Update Modal */}
      <ProfilePhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentImageUrl={avatarUrl}
        onImageChange={(newUrl) => setAvatarUrl(newUrl)}
        bucketName="avatars"
        title="Update Profile Photo"
      />
    </div>
  );
}
