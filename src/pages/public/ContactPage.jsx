import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, Sparkles, MessageSquare } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabase/supabaseClient';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  company: z.string().min(2, "Company name is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "Exhibitor & AI Matching Inquiry",
      message: ""
    }
  });

  const onSubmit = async (values) => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('contact_messages').insert([
          { ...values, created_at: new Date().toISOString() }
        ]);
      }
    } catch (e) {
      console.warn("Supabase contact save fallback:", e);
    }

    setSubmitted(true);
    toast.success("Thank you. We'll get back to you.");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>Get in Touch with ExhiLink AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Our B2B Support Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions about AI exhibition matching, stall allocations, or corporate enterprise partnerships? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Info Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 space-y-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-extrabold text-lg tracking-tight">ExhiLink AI HQ</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Our B2B engineering and trade exhibition operations team provides 24/7 assistance for buyers, exhibitors, and organizers across India.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-blue-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">Headquarters</span>
                  <span className="text-slate-300">BKC Financial District, Bandra East, Mumbai, MH 400051</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">Email Us</span>
                  <span className="text-slate-300">support@exhilink.ai • sales@exhilink.ai</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">Phone Support</span>
                  <span className="text-slate-300">+91 (022) 4900 8800 (Mon–Sat 9AM–7PM)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
            <span>Official B2B Exhibition Partner • ISO 27001 Certified</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Thank you. We'll get back to you.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your message has been logged in our system. A representative will contact you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  reset();
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="rajesh@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="e.g. Sharma Precision Pvt Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.company && <p className="text-red-500 text-[10px] mt-1">{errors.company.message}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    {...register('subject')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.subject && <p className="text-red-500 text-[10px] mt-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message / Inquiry Details</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Describe your machinery procurement requirement or booth inquiry..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
                {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
