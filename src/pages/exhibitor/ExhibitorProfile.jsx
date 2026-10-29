import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Building2, Save, X, Edit3, ShieldCheck, MapPin, Mail, Phone, Globe, Camera, Users, Calendar, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ProfilePhotoModal from '../../components/common/ProfilePhotoModal';

const exhibitorProfileSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  contact_person: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  business_category: z.string().min(2, "Business category is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  website: z.string().url("Must be a valid URL").or(z.string().length(0)).optional(),
  company_size: z.string().optional(),
  year_established: z.coerce.number().min(1800, "Valid year required").max(2030, "Valid year required")
});

export default function ExhibitorProfile() {
  const { currentUser, updateProfile } = useAuth();
  const { exhibitors, products } = useData();
  const exhibitor = exhibitors.find(e => e.id === "exh-comp-1") || exhibitors[0];

  const [isEditing, setIsEditing] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(currentUser?.avatar_url || exhibitor?.logo_url || '');

  const companyProducts = products.filter(p => p.exhibitor_id === exhibitor?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(exhibitorProfileSchema),
    defaultValues: {
      company_name: currentUser?.company_name || exhibitor?.company_name || "ABC Machinery Tools Pvt Ltd",
      contact_person: currentUser?.full_name || "Amit Patel",
      email: currentUser?.email || exhibitor?.email || "contact@abcmachinery.example.com",
      phone: currentUser?.phone || exhibitor?.phone || "+91 98980 12345",
      business_category: exhibitor?.business_category || "CNC Machinery & Fiber Laser Systems",
      description: exhibitor?.description || "Leading ISO 9001 certified manufacturer of CNC fiber laser cutting systems, hydraulic press brakes, and metal processing machinery.",
      city: exhibitor?.city || "Pune",
      state: exhibitor?.state || "Maharashtra",
      website: exhibitor?.website || "https://abcmachinery.example.com",
      company_size: "50-200 Employees",
      year_established: exhibitor?.year_established || 2008
    }
  });

  const getInitials = (name) => {
    if (!name) return 'AM';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      avatar_url: logoUrl
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
    setLogoUrl(currentUser?.avatar_url || exhibitor?.logo_url || '');
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Exhibitor Profile
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage official corporate branding, product catalog links, and booth presentation.
          </p>
        </div>

        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Company Profile</span>
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

      {/* Main Card */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6 text-xs">
        {/* Company Logo Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Company logo"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 bg-white p-1 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-slate-200 shadow-sm">
                {getInitials(exhibitor?.company_name)}
              </div>
            )}

            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform hover:scale-110"
              title="Change Logo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-slate-900">
                {exhibitor?.company_name || "ABC Machinery Tools Pvt Ltd"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                Verified Manufacturer
              </span>
            </div>
            <p className="text-slate-500 font-semibold">
              {exhibitor?.business_category} • Est. {exhibitor?.year_established || 2008}
            </p>
            <p className="text-slate-400">
              {exhibitor?.city}, {exhibitor?.state} • {companyProducts.length} Live Products Listed
            </p>
            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Change Logo</span>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Corporate Details & Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="font-bold text-slate-700 block mb-1">Key Contact Person</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('contact_person')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.contact_person && <p className="text-red-500 text-[10px] mt-1">{errors.contact_person.message}</p>}
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
              <label className="font-bold text-slate-700 block mb-1">Year Established</label>
              <input
                type="number"
                disabled={!isEditing}
                {...register('year_established')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.year_established && <p className="text-red-500 text-[10px] mt-1">{errors.year_established.message}</p>}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Size</label>
              <input
                type="text"
                disabled={!isEditing}
                {...register('company_size')}
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Website</label>
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

        {/* Description */}
        <div>
          <label className="font-bold text-slate-700 block mb-1">Company Overview & Manufacturing Capabilities</label>
          <textarea
            rows={3}
            disabled={!isEditing}
            {...register('description')}
            className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/60 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
          {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
        </div>

        {/* Save Bar */}
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

      {/* Logo Photo Modal */}
      <ProfilePhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentImageUrl={logoUrl}
        onImageChange={(newUrl) => setLogoUrl(newUrl)}
        bucketName="company-logos"
        title="Update Company Logo"
      />
    </div>
  );
}
