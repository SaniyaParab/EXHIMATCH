import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import DashboardHeader from '../components/common/DashboardHeader';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ allowedRole }) {
  const { currentRole, currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Route protection
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentRole !== allowedRole) {
    // Redirect to respective role dashboard
    if (currentRole === 'buyer') return <Navigate to="/buyer/dashboard" replace />;
    if (currentRole === 'exhibitor') return <Navigate to="/exhibitor/dashboard" replace />;
    if (currentRole === 'organizer') return <Navigate to="/organizer/dashboard" replace />;
  }

  // Derive title from pathname
  const getHeaderInfo = () => {
    const p = location.pathname;
    if (p.includes('/buyer/discover')) return { title: "Find Suppliers", subtitle: "AI-Powered B2B Matching Engine" };
    if (p.includes('/buyer/results')) return { title: "AI Recommendations", subtitle: "Stall-Level Matches for Your Requirement" };
    if (p.includes('/buyer/stalls')) return { title: "Recommended Stalls", subtitle: "Top High-Affinity Booths at Exhibitions" };
    if (p.includes('/buyer/map')) return { title: "Floor Plan & Map", subtitle: "Interactive Live Exhibition Layout" };
    if (p.includes('/buyer/appointments')) return { title: "My Appointments", subtitle: "Confirmed B2B Trade Discussions" };
    if (p.includes('/buyer/profile')) return { title: "Buyer Profile", subtitle: "Procurement Requirements & Company Info" };
    if (p.includes('/exhibitor/leads')) return { title: "Qualified Leads CRM", subtitle: "High Intent Buyers & Booked Appointments" };
    if (p.includes('/exhibitor/stall')) return { title: "My Stall", subtitle: "Confirmed Booth Allocation & Floor Location" };
    if (p.includes('/exhibitor/products')) return { title: "Machinery & Products", subtitle: "Catalog Displayed on ExhiMatch AI" };
    if (p.includes('/exhibitor/analytics')) return { title: "Exhibitor Analytics", subtitle: "Booth Footfall, Leads & Conversion Rates" };
    if (p.includes('/organizer/profile')) return { title: "Organizer Profile", subtitle: "Exhibition House & Management Info" };
    if (p.includes('/organizer/stall-requests')) return { title: "Stall Requests", subtitle: "Exhibitor Booth Applications & Approval" };
    if (p.includes('/organizer/stalls')) return { title: "Floor Allocations", subtitle: "Manage Booth Status Across Halls" };
    if (p.includes('/organizer/exhibitions')) return { title: "Manage Exhibitions", subtitle: "Trade Fairs, Dates & Venues" };
    return { title: `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard`, subtitle: "ExhiMatch AI B2B Intelligence Hub" };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <DashboardHeader 
            onMenuClick={() => setSidebarOpen(true)}
            title={headerInfo.title}
            subtitle={headerInfo.subtitle}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
