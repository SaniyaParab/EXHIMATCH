import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import PublicExhibitionsPage from './pages/public/PublicExhibitionsPage';
import PublicExhibitionDetailsPage from './pages/public/PublicExhibitionDetailsPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Buyer Pages
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerProfile from './pages/buyer/BuyerProfile';
import BuyerDiscover from './pages/buyer/BuyerDiscover';
import BuyerResults from './pages/buyer/BuyerResults';
import BuyerExhibitions from './pages/buyer/BuyerExhibitions';
import BuyerStalls from './pages/buyer/BuyerStalls';
import BuyerFloorMap from './pages/buyer/BuyerFloorMap';
import BuyerExhibitorProfile from './pages/buyer/BuyerExhibitorProfile';
import BuyerAppointments from './pages/buyer/BuyerAppointments';
import BuyerSaved from './pages/buyer/BuyerSaved';
import BuyerNotifications from './pages/buyer/BuyerNotifications';

// Exhibitor Pages
import ExhibitorDashboard from './pages/exhibitor/ExhibitorDashboard';
import ExhibitorProfile from './pages/exhibitor/ExhibitorProfile';
import ExhibitorProducts from './pages/exhibitor/ExhibitorProducts';
import ExhibitorExhibitions from './pages/exhibitor/ExhibitorExhibitions';
import ExhibitorApply from './pages/exhibitor/ExhibitorApply';
import ExhibitorMyStall from './pages/exhibitor/ExhibitorMyStall';
import ExhibitorRequestStall from './pages/exhibitor/ExhibitorRequestStall';
import ExhibitorAppointments from './pages/exhibitor/ExhibitorAppointments';
import ExhibitorLeads from './pages/exhibitor/ExhibitorLeads';
import ExhibitorAnalytics from './pages/exhibitor/ExhibitorAnalytics';
import ExhibitorNotifications from './pages/exhibitor/ExhibitorNotifications';

// Organizer Pages
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import OrganizerProfile from './pages/organizer/OrganizerProfile';
import OrganizerExhibitions from './pages/organizer/OrganizerExhibitions';
import OrganizerExhibitionsCreate from './pages/organizer/OrganizerExhibitionsCreate';
import OrganizerHalls from './pages/organizer/OrganizerHalls';
import OrganizerStalls from './pages/organizer/OrganizerStalls';
import OrganizerStallRequests from './pages/organizer/OrganizerStallRequests';
import OrganizerExhibitorApplications from './pages/organizer/OrganizerExhibitorApplications';
import OrganizerAppointments from './pages/organizer/OrganizerAppointments';
import OrganizerLeads from './pages/organizer/OrganizerLeads';
import OrganizerAnalytics from './pages/organizer/OrganizerAnalytics';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/exhibitions" element={<PublicExhibitionsPage />} />
        <Route path="/exhibition/:id" element={<PublicExhibitionDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Buyer Pages */}
      <Route element={<DashboardLayout allowedRole="buyer" />}>
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/profile" element={<BuyerProfile />} />
        <Route path="/buyer/profile/edit" element={<BuyerProfile />} />
        <Route path="/buyer/discover" element={<BuyerDiscover />} />
        <Route path="/buyer/results" element={<BuyerResults />} />
        <Route path="/buyer/exhibitions" element={<BuyerExhibitions />} />
        <Route path="/buyer/exhibition/:id" element={<PublicExhibitionDetailsPage />} />
        <Route path="/buyer/stalls" element={<BuyerStalls />} />
        <Route path="/buyer/map/:id" element={<BuyerFloorMap />} />
        <Route path="/buyer/exhibitor/:id" element={<BuyerExhibitorProfile />} />
        <Route path="/buyer/appointments" element={<BuyerAppointments />} />
        <Route path="/buyer/saved" element={<BuyerSaved />} />
        <Route path="/buyer/notifications" element={<BuyerNotifications />} />
      </Route>

      {/* Exhibitor Pages */}
      <Route element={<DashboardLayout allowedRole="exhibitor" />}>
        <Route path="/exhibitor/dashboard" element={<ExhibitorDashboard />} />
        <Route path="/exhibitor/profile" element={<ExhibitorProfile />} />
        <Route path="/exhibitor/profile/edit" element={<ExhibitorProfile />} />
        <Route path="/exhibitor/products" element={<ExhibitorProducts />} />
        <Route path="/exhibitor/products/add" element={<ExhibitorProducts />} />
        <Route path="/exhibitor/exhibitions" element={<ExhibitorExhibitions />} />
        <Route path="/exhibitor/apply" element={<ExhibitorApply />} />
        <Route path="/exhibitor/stall" element={<ExhibitorMyStall />} />
        <Route path="/exhibitor/stall/request" element={<ExhibitorRequestStall />} />
        <Route path="/exhibitor/appointments" element={<ExhibitorAppointments />} />
        <Route path="/exhibitor/leads" element={<ExhibitorLeads />} />
        <Route path="/exhibitor/analytics" element={<ExhibitorAnalytics />} />
        <Route path="/exhibitor/notifications" element={<ExhibitorNotifications />} />
      </Route>

      {/* Organizer Pages */}
      <Route element={<DashboardLayout allowedRole="organizer" />}>
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/profile" element={<OrganizerProfile />} />
        <Route path="/organizer/profile/edit" element={<OrganizerProfile />} />
        <Route path="/organizer/exhibitions" element={<OrganizerExhibitions />} />
        <Route path="/organizer/exhibitions/create" element={<OrganizerExhibitionsCreate />} />
        <Route path="/organizer/exhibitions/:id" element={<OrganizerStalls />} />
        <Route path="/organizer/halls" element={<OrganizerHalls />} />
        <Route path="/organizer/stalls" element={<OrganizerStalls />} />
        <Route path="/organizer/stall-requests" element={<OrganizerStallRequests />} />
        <Route path="/organizer/exhibitors" element={<OrganizerExhibitorApplications />} />
        <Route path="/organizer/appointments" element={<OrganizerAppointments />} />
        <Route path="/organizer/leads" element={<OrganizerLeads />} />
        <Route path="/organizer/analytics" element={<OrganizerAnalytics />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
