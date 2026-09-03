import React from 'react';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import Logo from '../../components/Logo';
import {
  LayoutDashboard,
  Wrench,
  Building,
  Users,
  Inbox,
  Settings,
  LogOut,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function AdminDashboardLayout() {
  const { t, isRTL, lang } = useLanguage();
  const { isAdminAuthenticated, adminLogout, inbox } = useData();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const unreadInboxCount = inbox.filter(m => m.status === 'New').length;

  const navItems = [
    { path: '/admin', label: t('dashboardOverview'), icon: LayoutDashboard, exact: true },
    { path: '/admin/services', label: t('manageServices'), icon: Wrench },
    { path: '/admin/projects', label: t('manageProjects'), icon: Building },
    { path: '/admin/clients', label: t('manageClients'), icon: Users },
    { path: '/admin/messages', label: t('manageInbox'), icon: Inbox, badge: unreadInboxCount },
    { path: '/admin/settings', label: t('manageSettings'), icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === '/admin';
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Header */}
      <header className="bg-slate-900 text-white py-3.5 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo showText={true} variant="white" className="h-10" />
          <span className="bg-[#E31E24] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
            CMS Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-xs font-bold text-slate-300 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            <span>معاينة الموقع المباشر</span>
          </Link>

          <button
            onClick={adminLogout}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors bg-red-950/60 border border-red-900/60 px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logoutBtn')}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#E31E24] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#2B3990]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge) && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      active ? 'bg-white text-[#E31E24]' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Content View */}
        <main className="lg:col-span-9">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
