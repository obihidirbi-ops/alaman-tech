import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ServiceIcon from '../../components/ServiceIcon';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';

export default function AdminServices() {
  const { t, lang } = useLanguage();
  const { services, saveService, deleteService } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title_ar: '',
    title_en: '',
    short_desc_ar: '',
    short_desc_en: '',
    icon_name: 'Flame',
    image_url: '',
    is_active: true
  });

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        id: service.id,
        slug: service.slug,
        title_ar: service.title_ar,
        title_en: service.title_en,
        short_desc_ar: service.short_desc_ar,
        short_desc_en: service.short_desc_en,
        icon_name: service.icon_name || 'Flame',
        image_url: service.image_url,
        is_active: service.is_active
      });
    } else {
      setEditingService(null);
      setFormData({
        id: '',
        slug: '',
        title_ar: '',
        title_en: '',
        short_desc_ar: '',
        short_desc_en: '',
        icon_name: 'Flame',
        image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        is_active: true
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveService(formData);
    setModalOpen(false);
  };

  const handleToggleActive = (serv) => {
    saveService({ ...serv, is_active: !serv.is_active });
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageServices')}</h1>
          <p className="text-xs text-slate-500">إضافة وتعديل وحذف خدمات الشركة ورفع الصور مباشرة من جهازك</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-[#E31E24] hover:bg-[#C41419] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-4 text-start font-bold">الأيقونة والصورة</th>
                <th className="p-4 text-start font-bold">اسم الخدمة (عربي)</th>
                <th className="p-4 text-start font-bold">اسم الخدمة (إنجليزي)</th>
                <th className="p-4 text-start font-bold">الحالة</th>
                <th className="p-4 text-center font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((serv) => (
                <tr key={serv.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={serv.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                      <div className="p-2 bg-slate-100 rounded-lg text-[#E31E24]">
                        <ServiceIcon name={serv.icon_name} className="w-4 h-4" />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{serv.title_ar}</td>
                  <td className="p-4 font-bold text-slate-700">{serv.title_en}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(serv)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                        serv.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {serv.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{serv.is_active ? 'نشط ومفعل' : 'مخفي'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(serv)}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('هل أنت تأكد من رغبتك في حذف هذه الخدمة؟')) {
                            deleteService(serv.id);
                          }
                        }}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with File Upload */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم الخدمة (عربي)</label>
                <input
                  type="text"
                  required
                  value={formData.title_ar}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم الخدمة (إنجليزي)</label>
                <input
                  type="text"
                  required
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">وصف مختصر (عربي)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.short_desc_ar}
                  onChange={(e) => setFormData({ ...formData, short_desc_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                ></textarea>
              </div>

              {/* Direct File Upload & URL Component */}
              <ImageUploadInput
                label="صورة الخدمة (رفع مباشر من جهازك أو وضع رابط)"
                recommendedSize="1200 × 800 px (نسبة 3:2 أو 16:9 - JPG/PNG بحجم < 2MB)"
                value={formData.image_url}
                onChange={(newUrl) => setFormData({ ...formData, image_url: newUrl })}
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="serv-active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label htmlFor="serv-active" className="font-bold text-slate-700">إظهار ونشر الخدمة على الموقع</label>
              </div>

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
                  className="px-5 py-2 bg-[#E31E24] text-white rounded-xl font-bold"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
