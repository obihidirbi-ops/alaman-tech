import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Mail, Phone, Building, Calendar, FileText, CheckCircle, Trash2, Eye } from 'lucide-react';

export default function AdminInbox() {
  const { t, lang } = useLanguage();
  const { inbox, updateInboxStatus, deleteInboxMessage } = useData();

  const [filterType, setFilterType] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const filteredInbox = inbox.filter(msg => {
    if (filterType === 'quote') return msg.type === 'quote';
    if (filterType === 'contact') return msg.type === 'contact';
    return true;
  });

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageInbox')}</h1>
          <p className="text-xs text-slate-500">استعراض طلبات عروض الأسعار والرسائل الواردة وتحديث حالتها</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            الجميع ({inbox.length})
          </button>
          <button
            onClick={() => setFilterType('quote')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'quote' ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            طلبات الأسعار ({inbox.filter(m => m.type === 'quote').length})
          </button>
          <button
            onClick={() => setFilterType('contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'contact' ? 'bg-[#2B3990] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            استفسارات التواصل ({inbox.filter(m => m.type === 'contact').length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredInbox.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">{t('noDataFound')}</div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {filteredInbox.map((msg) => (
              <div key={msg.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      msg.type === 'quote' ? 'bg-red-100 text-[#E31E24]' : 'bg-blue-100 text-[#2B3990]'
                    }`}>
                      {msg.type === 'quote' ? 'طلب عرض سعر' : 'رسالة تواصل'}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{msg.full_name}</span>
                    {msg.company_name && (
                      <span className="text-slate-500 text-xs font-normal">({msg.company_name})</span>
                    )}
                  </div>

                  <div className="text-slate-500 flex flex-wrap items-center gap-4 text-[11px] pt-1">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> <span dir="ltr">{msg.phone}</span></span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> <span>{msg.email}</span></span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> <span>{new Date(msg.created_at).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</span></span>
                  </div>

                  <p className="text-slate-700 font-semibold line-clamp-1 pt-1">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Status Dropdown */}
                  <select
                    value={msg.status}
                    onChange={(e) => updateInboxStatus(msg.id, e.target.value)}
                    className="bg-slate-100 border border-slate-200 text-slate-800 rounded-lg p-1.5 text-xs font-bold"
                  >
                    <option value="New">جديد (New)</option>
                    <option value="Contacted">تم التواصل (Contacted)</option>
                    <option value="In Progress">قيد التنفيذ (In Progress)</option>
                    <option value="Completed">مكتمل (Completed)</option>
                    <option value="Archived">مؤرشف (Archived)</option>
                  </select>

                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg font-bold flex items-center gap-1"
                    title="معاينة الرسالة كاملة"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('هل أنت تأكد من حذف الرسالة؟')) {
                        deleteInboxMessage(msg.id);
                      }
                    }}
                    className="p-2 bg-red-50 text-red-600 rounded-lg"
                    title="حذف الرسالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                تفاصيل الطلب: {selectedMessage.full_name}
              </h3>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400 hover:text-slate-600">
                إغلاق
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div><strong>الاسم:</strong> {selectedMessage.full_name}</div>
              <div><strong>الشركة / المنشأة:</strong> {selectedMessage.company_name || 'غير محدد'}</div>
              <div><strong>رقم الجوال:</strong> <span dir="ltr">{selectedMessage.phone}</span></div>
              <div><strong>البريد الإلكتروني:</strong> {selectedMessage.email}</div>
              {selectedMessage.service_slug && <div><strong>الخدمة المطلوبة:</strong> {selectedMessage.service_slug}</div>}
              {selectedMessage.project_type && <div><strong>نوع المشروع:</strong> {selectedMessage.project_type}</div>}
              {selectedMessage.project_location && <div><strong>موقع المشروع:</strong> {selectedMessage.project_location}</div>}
              {selectedMessage.file_url && <div><strong>الملف المرفق:</strong> {selectedMessage.file_url}</div>}
              <div className="pt-2 border-t">
                <strong>تفاصيل الرسالة والطلب:</strong>
                <p className="bg-slate-50 p-3 rounded-xl mt-1 text-slate-900 font-medium leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
