import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Wrench, Building, Users, Inbox, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function AdminOverview() {
  const { t, lang } = useLanguage();
  const { services, projects, clients, inbox } = useData();

  const contactCount = inbox.filter(m => m.type === 'contact').length;
  const quoteCount = inbox.filter(m => m.type === 'quote').length;
  const newMessagesCount = inbox.filter(m => m.status === 'New').length;

  return (
    <div className="space-y-8">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 font-cairo">
          لوحة تحكم إدارة المحتوى CMS
        </h1>
        <p className="text-xs text-slate-500">
          مرحباً بك في لوحة تحكم موقع شركة الأمان الأول للتقنية. يمكنك إدارة الخدمات، المشاريع، العملاء، والرسائل الواردة مباشرة.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">{t('manageServices')}</div>
            <div className="text-2xl font-black text-slate-900 font-cairo mt-1">{services.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E31E24] flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">{t('manageProjects')}</div>
            <div className="text-2xl font-black text-slate-900 font-cairo mt-1">{projects.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2B3990] flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">{t('manageClients')}</div>
            <div className="text-2xl font-black text-slate-900 font-cairo mt-1">{clients.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">طلبات ورسائل واردة</div>
            <div className="text-2xl font-black text-[#E31E24] font-cairo mt-1">{inbox.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Inbox Quick List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 font-cairo">أحدث طلبات عروض الأسعار والاستفسارات</h2>
          <Link to="/admin/messages" className="text-xs font-bold text-[#E31E24] hover:underline flex items-center gap-1">
            <span>عرض الجميع</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inbox.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">{t('noDataFound')}</p>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {inbox.slice(0, 5).map((msg) => (
              <div key={msg.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">{msg.full_name} ({msg.company_name || 'فرد'})</div>
                  <div className="text-slate-500 text-[11px]">{msg.email} | {msg.phone}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    msg.type === 'quote' ? 'bg-red-50 text-[#E31E24]' : 'bg-blue-50 text-[#2B3990]'
                  }`}>
                    {msg.type === 'quote' ? 'طلب عرض سعر' : 'استفسار'}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
