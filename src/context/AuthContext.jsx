import React, { createContext, useContext, useState, useEffect } from 'react';
import { SEED_PROFILES } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../supabase/supabaseClient';

const AuthContext = createContext(null);

const STORAGE_AUTH_KEY = 'exhimatch_auth_user_v1';

export function AuthProvider({ children }) {
  // Default to null so unauthenticated users must login or sign up
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse auth user:", e);
    }
    return null; // Require login/signup
  });

  const [loading, setLoading] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  }, [currentUser]);

  // Fast demo role switch for testing / hackathon judges
  const switchDemoRole = (role) => {
    if (role === 'buyer') {
      setCurrentUser(SEED_PROFILES[0]); // Rajesh Sharma (rajesh@sharmaindustries.com)
    } else if (role === 'exhibitor') {
      setCurrentUser(SEED_PROFILES[1]); // Amit Patel (amit@abcmachinery.com)
    } else if (role === 'organizer') {
      setCurrentUser(SEED_PROFILES[2]); // Sunil Verma (sunil@mahaexpo.com)
    }
  };

  const login = async (email, password, roleHint = 'buyer') => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
        if (profile) {
          setCurrentUser(profile);
          setLoading(false);
          return { success: true, user: profile };
        }
      }

      // Check seed profiles or match by email
      const matched = SEED_PROFILES.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        setLoading(false);
        return { success: true, user: matched };
      }

      // Fallback create ad-hoc session with empty avatar for user to upload
      const newUser = {
        id: `prof-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        email: email,
        full_name: email.split('@')[0],
        role: roleHint,
        phone: "+91 98000 00000",
        company_name: `${email.split('@')[0].toUpperCase()} Enterprises`,
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        avatar_url: ""
      };
      setCurrentUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const register = async ({ email, password, fullName, companyName, role, phone, city }) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        const profile = {
          user_id: data.user?.id,
          email,
          full_name: fullName,
          company_name: companyName,
          role,
          phone,
          city,
          country: 'India',
          avatar_url: "" // User will upload their own photo
        };
        await supabase.from('profiles').insert([profile]);
        setCurrentUser(profile);
        setLoading(false);
        return { success: true, user: profile };
      }

      const newUser = {
        id: `prof-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        email,
        full_name: fullName,
        company_name: companyName,
        role: role || 'buyer',
        phone: phone || "+91 98000 11111",
        city: city || "Mumbai",
        state: "Maharashtra",
        country: "India",
        avatar_url: "", // User uploads their own image
        preferred_categories: ["Industrial Machinery"],
        budget_min: 1000000,
        budget_max: 5000000,
        max_travel_distance: 200
      };
      setCurrentUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    // Switch to null or reset to guest
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_AUTH_KEY);
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const updated = { ...currentUser, ...updates, updated_at: new Date().toISOString() };
      if (isSupabaseConfigured && supabase && currentUser?.user_id) {
        await supabase.from('profiles').update(updates).eq('user_id', currentUser.user_id);
      }
      setCurrentUser(updated);
      setLoading(false);
      return { success: true, user: updated };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole: currentUser?.role || 'buyer',
      loading,
      login,
      register,
      logout,
      updateProfile,
      switchDemoRole,
      isSupabaseConnected: isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
