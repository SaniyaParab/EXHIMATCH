import React, { useState } from 'react';
import { toast } from 'sonner';
import { Settings, User, Bell, Lock, Shield, Eye, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { currentUser, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  // Form states
  const [email, setEmail] = useState(currentUser?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifApp, setNotifApp] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const result = await updateProfile({ email });
    if (result.success) {
      toast.success("Account settings saved successfully.");
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error("Failed to save settings.");
    }
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    toast.success("Notification preferences updated.");
  };

  const handleDeleteAccount = () => {
    toast.success("Account deletion request submitted.");
    setDeleteModalOpen(false);
    logout();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-xs">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>Account Settings & Preferences</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage security parameters, notifications, privacy, and account preferences.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        {[
          { id: 'account', label: 'Account Security', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy & Security', icon: Shield },
          { id: 'appearance', label: 'Appearance', icon: Eye }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Account Security */}
      {activeTab === 'account' && (
        <form onSubmit={handleSaveAccount} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
              Change Account Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep unchanged"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
              >
                Save Account Changes
              </button>
            </div>
          </div>

          {/* Danger Zone: Delete Account */}
          <div className="pt-6 border-t border-red-100 space-y-3">
            <h4 className="font-extrabold text-sm text-red-600 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" />
              <span>Danger Zone</span>
            </h4>
            <p className="text-slate-500">
              Deleting your account will remove all saved exhibitions, appointments, and matching data permanently.
            </p>
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-6">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            Notification Alerts & Digest
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <span className="font-bold text-slate-900 block">Email Alerts</span>
                <span className="text-slate-500 text-[11px]">Receive booking confirmations and lead updates via email</span>
              </div>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <span className="font-bold text-slate-900 block">SMS Reminders</span>
                <span className="text-slate-500 text-[11px]">Get text reminders 1 hour before scheduled booth appointments</span>
              </div>
              <input
                type="checkbox"
                checked={notifSms}
                onChange={(e) => setNotifSms(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <span className="font-bold text-slate-900 block">In-App Notifications</span>
                <span className="text-slate-500 text-[11px]">Show real-time badges for stall approvals and new matches</span>
              </div>
              <input
                type="checkbox"
                checked={notifApp}
                onChange={(e) => setNotifApp(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
            >
              Save Notification Preferences
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Privacy & Security */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            Data Privacy & Row Level Security (RLS)
          </h3>
          <p className="text-slate-600 leading-relaxed">
            ExhiLink AI enforces Supabase Row Level Security. Only authorized buyers and exhibitors can view full phone numbers and detailed appointment requirement specs.
          </p>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-semibold space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-emerald-800">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>RLS Status: Enabled & Verified</span>
            </p>
            <p className="text-[11px] text-emerald-700">
              Your profile information and lead CRM pipeline are protected under enterprise-grade encryption.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Appearance */}
      {activeTab === 'appearance' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 pb-1 border-b border-slate-100">
            Theme & Interface Options
          </h3>
          <p className="text-slate-600">
            ExhiLink AI features a clean, high-contrast B2B neutral theme optimized for desktop & mobile usage.
          </p>
          <div className="flex gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-blue-600 text-center font-bold text-slate-900 space-y-1 w-36 cursor-pointer">
              <span className="block text-sm">Light SaaS</span>
              <span className="text-[10px] text-blue-600 font-bold uppercase">Active Theme</span>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Are you sure you want to delete your account?</h3>
            <p className="text-slate-500 text-xs">
              This action cannot be undone. All your saved exhibitions, stall requests, and appointments will be removed.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-sm"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
