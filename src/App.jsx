import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';

import Home from './pages/Home';
import About from './pages/About';
import ServicesCatalog from './pages/ServicesCatalog';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsCatalog from './pages/ProjectsCatalog';
import ClientsPage from './pages/ClientsPage';
import ContactUs from './pages/ContactUs';
import RequestQuote from './pages/RequestQuote';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboardLayout from './pages/admin/AdminDashboardLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminServices from './pages/admin/AdminServices';
import AdminProjects from './pages/admin/AdminProjects';
import AdminClients from './pages/admin/AdminClients';
import AdminInbox from './pages/admin/AdminInbox';
import AdminSettings from './pages/admin/AdminSettings';

/**
 * ScrollToTop Component:
 * Automatically scrolls the browser window to top (0,0) whenever route changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

import CompanyProfileModal from './components/CompanyProfileModal';
import { useData } from './context/DataContext';

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { isProfileModalOpen, closeProfileModal } = useData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-tajawal selection:bg-[#E31E24] selection:text-white">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Portal Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesCatalog />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<ProjectsCatalog />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/request-quote" element={<RequestQuote />} />

          {/* Admin CMS Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="messages" element={<AdminInbox />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWhatsapp />}

      {/* Global Branded Company Profile PDF Modal */}
      <CompanyProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <MainLayout />
        </DataProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
