import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SEED_EXHIBITIONS,
  SEED_EXHIBITORS,
  SEED_PRODUCTS,
  SEED_STALLS,
  SEED_HALLS,
  SEED_APPOINTMENTS,
  SEED_LEADS,
  SEED_STALL_REQUESTS,
  SEED_REVIEWS,
  SEED_NOTIFICATIONS,
  SEED_SAVED_EXHIBITIONS,
  SEED_SAVED_EXHIBITORS
} from '../data/seedData';
import { runAIMatching } from '../services/aiMatchingEngine';
import { supabase, isSupabaseConfigured, LOCAL_STORE_KEY } from '../supabase/supabaseClient';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Load persisted state or seeds
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          exhibitions: parsed.exhibitions || SEED_EXHIBITIONS,
          exhibitors: parsed.exhibitors || SEED_EXHIBITORS,
          products: parsed.products || SEED_PRODUCTS,
          stalls: parsed.stalls || SEED_STALLS,
          halls: parsed.halls || SEED_HALLS,
          appointments: parsed.appointments || SEED_APPOINTMENTS,
          leads: parsed.leads || SEED_LEADS,
          stallRequests: parsed.stallRequests || SEED_STALL_REQUESTS,
          reviews: parsed.reviews || SEED_REVIEWS,
          notifications: parsed.notifications || SEED_NOTIFICATIONS,
          savedExhibitions: parsed.savedExhibitions || SEED_SAVED_EXHIBITIONS,
          savedExhibitors: parsed.savedExhibitors || SEED_SAVED_EXHIBITORS
        };
      }
    } catch (e) {
      console.error("Failed to load local store:", e);
    }
    return {
      exhibitions: SEED_EXHIBITIONS,
      exhibitors: SEED_EXHIBITORS,
      products: SEED_PRODUCTS,
      stalls: SEED_STALLS,
      halls: SEED_HALLS,
      appointments: SEED_APPOINTMENTS,
      leads: SEED_LEADS,
      stallRequests: SEED_STALL_REQUESTS,
      reviews: SEED_REVIEWS,
      notifications: SEED_NOTIFICATIONS,
      savedExhibitions: SEED_SAVED_EXHIBITIONS,
      savedExhibitors: SEED_SAVED_EXHIBITORS
    };
  });

  // Current active buyer search requirement (initialized with the Demo Scenario)
  const [buyerRequirement, setBuyerRequirement] = useState({
    product_name: "CNC Laser Cutting Machine",
    category: "Industrial Machinery",
    budget_min: 2000000,
    budget_max: 3000000,
    location: "Mumbai",
    max_distance: 200,
    preferred_date: "2026-11-13",
    additional_notes: "Suitable for metal sheet cutting with fast piercing speeds"
  });

  // Active AI matching results
  const [aiResults, setAiResults] = useState(() => {
    return runAIMatching({
      buyerReq: {
        product_name: "CNC Laser Cutting Machine",
        category: "Industrial Machinery",
        budget_min: 2000000,
        budget_max: 3000000,
        location: "Mumbai",
        max_distance: 200,
        preferred_date: "2026-11-13",
        additional_notes: "Suitable for metal sheet cutting with fast piercing speeds"
      },
      products: SEED_PRODUCTS,
      exhibitors: SEED_EXHIBITORS,
      exhibitions: SEED_EXHIBITIONS,
      stalls: SEED_STALLS
    });
  });

  const [isMatchingLoading, setIsMatchingLoading] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to persist data:", e);
    }
  }, [data]);

  // Execute AI Matching with animated delay
  const executeAIMatching = async (customReq) => {
    setIsMatchingLoading(true);
    const req = customReq || buyerRequirement;
    setBuyerRequirement(req);

    // Realistic AI computation pause
    await new Promise(resolve => setTimeout(resolve, 800));

    const results = runAIMatching({
      buyerReq: req,
      products: data.products,
      exhibitors: data.exhibitors,
      exhibitions: data.exhibitions,
      stalls: data.stalls
    });

    setAiResults(results);
    setIsMatchingLoading(false);
    return results;
  };

  // Re-run matching whenever stalls or products update
  const refreshAIMatching = () => {
    const results = runAIMatching({
      buyerReq: buyerRequirement,
      products: data.products,
      exhibitors: data.exhibitors,
      exhibitions: data.exhibitions,
      stalls: data.stalls
    });
    setAiResults(results);
  };

  // 1. APPOINTMENT & LEAD GENERATION (Connected Workflow)
  const bookAppointment = ({
    buyer,
    exhibitorId,
    exhibitionId,
    stallId,
    productId,
    date,
    timeSlot,
    purpose,
    notes,
    matchPercentage = 96
  }) => {
    const exhibitor = data.exhibitors.find(e => e.id === exhibitorId);
    const exhibition = data.exhibitions.find(ex => ex.id === exhibitionId);
    const product = data.products.find(p => p.id === productId);
    const stall = data.stalls.find(s => s.id === stallId);

    const bookingNum = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `EXH-2026-${bookingNum}`;

    const newAppointment = {
      id: `app-${Date.now()}`,
      booking_id: bookingId,
      buyer_id: buyer.id || "prof-buyer-1",
      exhibitor_id: exhibitorId,
      exhibition_id: exhibitionId,
      stall_id: stallId,
      product_id: productId,
      date: date || "2026-11-13",
      time_slot: timeSlot || "11:30 AM",
      purpose: purpose || `Discussion & demonstration for ${product?.name || "Machinery"}`,
      requirement_notes: notes || "High priority procurement interest",
      status: "confirmed",
      created_at: new Date().toISOString()
    };

    // Automatically generate a QUALIFIED LEAD for the exhibitor's CRM
    const newLead = {
      id: `lead-${Date.now()}`,
      appointment_id: newAppointment.id,
      buyer_id: buyer.id || "prof-buyer-1",
      exhibitor_id: exhibitorId,
      exhibition_id: exhibitionId,
      stall_id: stallId,
      product_name: product?.name || buyerRequirement.product_name || "CNC Laser Cutting Machine",
      buyer_company: buyer.company_name || "Sharma Precision Fab Pvt Ltd",
      buyer_name: buyer.full_name || "Rajesh Sharma",
      buyer_email: buyer.email || "rajesh@sharmaindustries.com",
      buyer_phone: buyer.phone || "+91 98201 44552",
      budget_range: `₹${(buyerRequirement.budget_min/100000).toFixed(0)}–${(buyerRequirement.budget_max/100000).toFixed(0)} Lakhs`,
      buyer_location: `${buyer.city || "Mumbai"}, ${buyer.state || "Maharashtra"}`,
      match_percentage: matchPercentage,
      status: "New",
      notes: `Appointment booked for ${date} at ${timeSlot}. Purpose: ${purpose || "Product evaluation"}.`,
      created_at: new Date().toISOString()
    };

    // Notifications for Buyer, Exhibitor, and Organizer
    const notifs = [
      {
        id: `notif-${Date.now()}-1`,
        user_id: buyer.user_id || "user-buyer-1",
        role: "buyer",
        title: "Appointment Booked!",
        message: `Your appointment with ${exhibitor?.company_name || 'Exhibitor'} at Stall ${stall?.stall_number || 'booth'} is confirmed for ${date} at ${timeSlot}. Booking ID: ${bookingId}`,
        type: "appointment",
        is_read: false,
        created_at: new Date().toISOString(),
        link: "/buyer/appointments"
      },
      {
        id: `notif-${Date.now()}-2`,
        user_id: exhibitor?.profile_id || "user-exhibitor-1",
        role: "exhibitor",
        title: "New Qualified Lead & Appointment",
        message: `${buyer.full_name} (${buyer.company_name}) scheduled a meeting for ${product?.name} at Stall ${stall?.stall_number}. Match: ${matchPercentage}%`,
        type: "lead",
        is_read: false,
        created_at: new Date().toISOString(),
        link: "/exhibitor/leads"
      },
      {
        id: `notif-${Date.now()}-3`,
        user_id: "user-organizer-1",
        role: "organizer",
        title: "B2B Appointment Registered",
        message: `${buyer.company_name} booked Stall ${stall?.stall_number} with ${exhibitor?.company_name} at ${exhibition?.name}.`,
        type: "info",
        is_read: false,
        created_at: new Date().toISOString(),
        link: "/organizer/appointments"
      }
    ];

    setData(prev => ({
      ...prev,
      appointments: [newAppointment, ...prev.appointments],
      leads: [newLead, ...prev.leads],
      notifications: [...notifs, ...prev.notifications]
    }));

    return { success: true, bookingId, appointment: newAppointment, lead: newLead };
  };

  const cancelAppointment = (appointmentId) => {
    const target = data.appointments.find(a => a.id === appointmentId);
    if (!target) return { success: false, error: "Appointment not found" };

    const cancelNotif = {
      id: `notif-${Date.now()}`,
      user_id: target.buyer_id,
      role: "buyer",
      title: "Appointment Cancelled",
      message: `Your appointment slot (${target.booking_id}) has been cancelled.`,
      type: "warning",
      is_read: false,
      created_at: new Date().toISOString(),
      link: "/buyer/appointments"
    };

    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === appointmentId ? { ...a, status: "cancelled" } : a),
      leads: prev.leads.map(l => l.appointment_id === appointmentId ? { ...l, status: "Cancelled" } : l),
      notifications: [cancelNotif, ...prev.notifications]
    }));

    return { success: true };
  };

  // 2. LEAD STATUS UPDATE (Exhibitor CRM)
  const updateLeadStatus = (leadId, newStatus, note = "") => {
    setData(prev => ({
      ...prev,
      leads: prev.leads.map(l => {
        if (l.id === leadId) {
          return {
            ...l,
            status: newStatus,
            notes: note ? `${l.notes}\n[Update]: ${note}` : l.notes,
            updated_at: new Date().toISOString()
          };
        }
        return l;
      })
    }));
  };

  // 3. STALL REQUEST & ORGANIZER APPROVAL WORKFLOW
  const requestStall = ({ exhibitionId, exhibitorId, stallId, notes = "" }) => {
    const stall = data.stalls.find(s => s.id === stallId);
    const exhibitor = data.exhibitors.find(e => e.id === exhibitorId);
    const exhibition = data.exhibitions.find(e => e.id === exhibitionId);

    const newRequest = {
      id: `req-${Date.now()}`,
      exhibition_id: exhibitionId,
      exhibitor_id: exhibitorId,
      stall_id: stallId,
      company_name: exhibitor?.company_name || "Applicant Exhibitor",
      stall_number: stall?.stall_number || "TBD",
      hall_code: stall?.hall_code || "A",
      requested_size: stall?.size || "3m x 3m",
      status: "pending",
      requested_at: new Date().toISOString(),
      notes: notes || "Requested stall via exhibitor portal."
    };

    const notif = {
      id: `notif-${Date.now()}`,
      user_id: "user-organizer-1",
      role: "organizer",
      title: "New Stall Allocation Request",
      message: `${exhibitor?.company_name} requested Stall ${stall?.stall_number} for ${exhibition?.name}.`,
      type: "stall",
      is_read: false,
      created_at: new Date().toISOString(),
      link: "/organizer/stall-requests"
    };

    setData(prev => ({
      ...prev,
      stallRequests: [newRequest, ...prev.stallRequests],
      stalls: prev.stalls.map(s => s.id === stallId ? { ...s, status: "pending" } : s),
      notifications: [notif, ...prev.notifications]
    }));

    return { success: true, request: newRequest };
  };

  const approveStallRequest = (requestId) => {
    const req = data.stallRequests.find(r => r.id === requestId);
    if (!req) return { success: false, error: "Request not found" };

    const stall = data.stalls.find(s => s.id === req.stall_id);
    const exhibitor = data.exhibitors.find(e => e.id === req.exhibitor_id);

    const approvalNotif = {
      id: `notif-${Date.now()}`,
      user_id: exhibitor?.profile_id || "user-exhibitor-1",
      role: "exhibitor",
      title: "Stall Confirmed!",
      message: `Your stall ${req.stall_number} has been confirmed for the exhibition.`,
      type: "stall",
      is_read: false,
      created_at: new Date().toISOString(),
      link: "/exhibitor/stall"
    };

    setData(prev => ({
      ...prev,
      stallRequests: prev.stallRequests.map(r => r.id === requestId ? { ...r, status: "approved" } : r),
      stalls: prev.stalls.map(s => s.id === req.stall_id ? {
        ...s,
        status: "occupied",
        current_exhibitor_id: req.exhibitor_id
      } : s),
      notifications: [approvalNotif, ...prev.notifications]
    }));

    refreshAIMatching();
    return { success: true };
  };

  const rejectStallRequest = (requestId, reason = "Stall allocation criteria not met") => {
    const req = data.stallRequests.find(r => r.id === requestId);
    if (!req) return { success: false, error: "Request not found" };

    const exhibitor = data.exhibitors.find(e => e.id === req.exhibitor_id);

    const rejectNotif = {
      id: `notif-${Date.now()}`,
      user_id: exhibitor?.profile_id || "user-exhibitor-1",
      role: "exhibitor",
      title: "Stall Request Update",
      message: `Your request for stall ${req.stall_number} was not approved (${reason}). You may select another stall.`,
      type: "warning",
      is_read: false,
      created_at: new Date().toISOString(),
      link: "/exhibitor/stall/request"
    };

    setData(prev => ({
      ...prev,
      stallRequests: prev.stallRequests.map(r => r.id === requestId ? { ...r, status: "rejected" } : r),
      stalls: prev.stalls.map(s => s.id === req.stall_id ? { ...s, status: "available" } : s),
      notifications: [rejectNotif, ...prev.notifications]
    }));

    return { success: true };
  };

  // 4. PRODUCT MANAGEMENT (Exhibitor)
  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      currency: "INR",
      moq: 1,
      is_featured: false,
      created_at: new Date().toISOString(),
      ...productData
    };
    setData(prev => ({
      ...prev,
      products: [newProduct, ...prev.products]
    }));
    refreshAIMatching();
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
    refreshAIMatching();
  };

  const deleteProduct = (id) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
    refreshAIMatching();
  };

  // 5. EXHIBITIONS & HALLS & STALLS (Organizer)
  const createExhibition = (exhibitionData) => {
    const newExhibition = {
      id: `exh-${Date.now()}`,
      status: "upcoming",
      exhibitor_count: 0,
      total_halls: 2,
      total_stalls: 30,
      distance_km: 45,
      created_at: new Date().toISOString(),
      ...exhibitionData
    };

    // Auto generate 2 default halls and stalls
    const hallA = { id: `hall-${Date.now()}-1`, exhibition_id: newExhibition.id, name: "Hall A - General Machinery", code: "A", floor: 1, capacity: 15 };
    const hallB = { id: `hall-${Date.now()}-2`, exhibition_id: newExhibition.id, name: "Hall B - Automation & Allied", code: "B", floor: 1, capacity: 15 };

    const generatedStalls = [];
    for (let i = 1; i <= 15; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      generatedStalls.push({
        id: `stall-${newExhibition.id}-A-${numStr}`,
        exhibition_id: newExhibition.id,
        hall_id: hallA.id,
        stall_number: `A${numStr}`,
        hall_code: "A",
        row_num: Math.ceil(i / 5),
        col_num: ((i - 1) % 5) + 1,
        size: "3m x 3m",
        category: "General",
        base_price: 75000,
        status: "available",
        current_exhibitor_id: null
      });
    }

    setData(prev => ({
      ...prev,
      exhibitions: [newExhibition, ...prev.exhibitions],
      halls: [...prev.halls, hallA, hallB],
      stalls: [...prev.stalls, ...generatedStalls]
    }));

    return newExhibition;
  };

  const addStall = (stallData) => {
    const newStall = {
      id: `stall-${Date.now()}`,
      status: 'available',
      current_exhibitor_id: null,
      ...stallData
    };
    setData(prev => ({
      ...prev,
      stalls: [...prev.stalls, newStall]
    }));
    return newStall;
  };

  // 6. REVIEWS
  const addReview = ({ buyer, exhibitorId, rating, reviewText, exhibitionId }) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      buyer_id: buyer.id,
      buyer_name: buyer.full_name,
      buyer_company: buyer.company_name,
      exhibitor_id: exhibitorId,
      exhibition_id: exhibitionId,
      rating: Number(rating) || 5,
      review_text: reviewText,
      created_at: new Date().toISOString()
    };

    setData(prev => {
      const updatedReviews = [newReview, ...prev.reviews];
      // Update exhibitor dynamic rating
      const exhibitorReviews = updatedReviews.filter(r => r.exhibitor_id === exhibitorId);
      const avg = (exhibitorReviews.reduce((sum, r) => sum + r.rating, 0) / exhibitorReviews.length).toFixed(1);
      
      const updatedExhibitors = prev.exhibitors.map(ex => {
        if (ex.id === exhibitorId) {
          return {
            ...ex,
            rating: Number(avg),
            review_count: exhibitorReviews.length
          };
        }
        return ex;
      });

      return {
        ...prev,
        reviews: updatedReviews,
        exhibitors: updatedExhibitors
      };
    });

    return newReview;
  };

  // 7. BOOKMARKS / SAVED ITEMS
  const toggleSaveExhibition = (exhibitionId) => {
    setData(prev => {
      const exists = prev.savedExhibitions.includes(exhibitionId);
      return {
        ...prev,
        savedExhibitions: exists
          ? prev.savedExhibitions.filter(id => id !== exhibitionId)
          : [...prev.savedExhibitions, exhibitionId]
      };
    });
  };

  const toggleSaveExhibitor = (exhibitorId) => {
    setData(prev => {
      const exists = prev.savedExhibitors.includes(exhibitorId);
      return {
        ...prev,
        savedExhibitors: exists
          ? prev.savedExhibitors.filter(id => id !== exhibitorId)
          : [...prev.savedExhibitors, exhibitorId]
      };
    });
  };

  // 8. NOTIFICATIONS
  const markNotificationRead = (notifId) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === notifId ? { ...n, is_read: true } : n)
    }));
  };

  const clearAllNotifications = (userId) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.user_id === userId ? { ...n, is_read: true } : n)
    }));
  };

  // Reset to initial demo seed data
  const resetToDemoDefaults = () => {
    localStorage.removeItem(LOCAL_STORE_KEY);
    setData({
      exhibitions: SEED_EXHIBITIONS,
      exhibitors: SEED_EXHIBITORS,
      products: SEED_PRODUCTS,
      stalls: SEED_STALLS,
      halls: SEED_HALLS,
      appointments: SEED_APPOINTMENTS,
      leads: SEED_LEADS,
      stallRequests: SEED_STALL_REQUESTS,
      reviews: SEED_REVIEWS,
      notifications: SEED_NOTIFICATIONS,
      savedExhibitions: SEED_SAVED_EXHIBITIONS,
      savedExhibitors: SEED_SAVED_EXHIBITORS
    });
    setBuyerRequirement({
      product_name: "CNC Laser Cutting Machine",
      category: "Industrial Machinery",
      budget_min: 2000000,
      budget_max: 3000000,
      location: "Mumbai",
      max_distance: 200,
      preferred_date: "2026-11-13",
      additional_notes: "Suitable for metal sheet cutting with fast piercing speeds"
    });
    setAiResults(runAIMatching({
      buyerReq: {
        product_name: "CNC Laser Cutting Machine",
        category: "Industrial Machinery",
        budget_min: 2000000,
        budget_max: 3000000,
        location: "Mumbai",
        max_distance: 200,
        preferred_date: "2026-11-13",
        additional_notes: "Suitable for metal sheet cutting with fast piercing speeds"
      },
      products: SEED_PRODUCTS,
      exhibitors: SEED_EXHIBITORS,
      exhibitions: SEED_EXHIBITIONS,
      stalls: SEED_STALLS
    }));
  };

  return (
    <DataContext.Provider value={{
      ...data,
      buyerRequirement,
      setBuyerRequirement,
      aiResults,
      isMatchingLoading,
      executeAIMatching,
      bookAppointment,
      cancelAppointment,
      updateLeadStatus,
      requestStall,
      approveStallRequest,
      rejectStallRequest,
      addProduct,
      updateProduct,
      deleteProduct,
      createExhibition,
      addStall,
      addReview,
      toggleSaveExhibition,
      toggleSaveExhibitor,
      markNotificationRead,
      clearAllNotifications,
      resetToDemoDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
