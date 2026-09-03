import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminClients() {
  const { t, lang } = useLanguage();
  const { clients, saveClient, deleteClient } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name_ar: '',
    name_en: '',
    logo_url: '',
    category: 'Corporate',
    is_active: true
  });

  const handleOpenModal = (c = null) => {
    if (c) {
      setEditingClient(c);
      setFormData({
        id: c.id,
        name_ar: c.name_ar,
        name_en: c.name_en,
        logo_url: c.logo_url,
        category: c.category || 'Corporate',
        is_active: c.is_active
      });
    } else {
      setEditingClient(null);
      setFormData({
        id: '',
        name_ar: '',
        name_en: '',
        logo_url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
        category: 'Corporate',
        is_active: true
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveClient(formData);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageClients')}</h1>
          <p className="text-xs text-slate-500">إضافة وتعديل شعب ورسومات شعارات العملاء بالرفع المباشر من جهازك</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عميل جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={c.logo_url} alt="" className="w-12 h-12 object-contain rounded border p-1" />
              <div>
                <div className="font-bold text-slate-900 text-xs">{c.name_ar}</div>
                <div className="text-[11px] text-slate-500">{c.name_en}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleOpenModal(c)}
                className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا العميل؟')) {
                    deleteClient(c.id);
                  }
                }}
                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingClient ? 'تعديل عميل' : 'إضافة عميل جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم العميل (عربي)</label>
                <input
                  type="text"
                  required
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم العميل (إنجليزي)</label>
                <input
                  type="text"
                  required
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              {/* Direct File Upload Component */}
              <ImageUploadInput
                label="شعار العميل (Logo - رفع مباشر من جهازك أو رابط)"
                recommendedSize="400 × 300 px (خلفية شفافة PNG)"
                value={formData.logo_url}
                onChange={(newUrl) => setFormData({ ...formData, logo_url: newUrl })}
              />

              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
