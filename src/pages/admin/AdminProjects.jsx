import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';

export default function AdminProjects() {
  const { t, lang } = useLanguage();
  const { projects, saveProject, deleteProject, services } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title_ar: '',
    title_en: '',
    category_id: 'fire-fighting-systems',
    client_name_ar: '',
    client_name_en: '',
    location_ar: '',
    location_en: '',
    year: '2025',
    status_ar: 'مكتمل',
    status_en: 'Completed',
    description_ar: '',
    description_en: '',
    image_url: '',
    image_url2: '',
    image_url3: '',
    is_published: true
  });

  const handleOpenModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      const gallery = proj.gallery_urls || [];
      setFormData({
        id: proj.id,
        slug: proj.slug,
        title_ar: proj.title_ar,
        title_en: proj.title_en,
        category_id: proj.category_id,
        client_name_ar: proj.client_name_ar || '',
        client_name_en: proj.client_name_en || '',
        location_ar: proj.location_ar,
        location_en: proj.location_en,
        year: proj.year,
        status_ar: proj.status_ar,
        status_en: proj.status_en,
        description_ar: proj.description_ar,
        description_en: proj.description_en,
        image_url: proj.image_url || gallery[0] || '',
        image_url2: gallery[1] || '',
        image_url3: gallery[2] || '',
        is_published: proj.is_published
      });
    } else {
      setEditingProject(null);
      setFormData({
        id: '',
        slug: '',
        title_ar: '',
        title_en: '',
        category_id: 'fire-fighting-systems',
        client_name_ar: '',
        client_name_en: '',
        location_ar: 'الرياض',
        location_en: 'Riyadh',
        year: '2025',
        status_ar: 'مكتمل',
        status_en: 'Completed',
        description_ar: '',
        description_en: '',
        image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        image_url2: '',
        image_url3: '',
        is_published: true
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const galleryList = [formData.image_url, formData.image_url2, formData.image_url3].filter(Boolean);
    saveProject({
      ...formData,
      image_url: formData.image_url || galleryList[0] || '',
      gallery_urls: galleryList,
      services_used: [formData.category_id]
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-cairo">{t('manageProjects')}</h1>
          <p className="text-xs text-slate-500">إضافة وتعديل المشاريع ورفع معرض صور متعدد (2 إلى 3 صور لكل مشروع)</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-[#2B3990] hover:bg-[#1E286C] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-4 text-start font-bold">المشروع ومعرض الصور</th>
                <th className="p-4 text-start font-bold">العميل والموقع</th>
                <th className="p-4 text-start font-bold">السنة</th>
                <th className="p-4 text-start font-bold">الحالة</th>
                <th className="p-4 text-center font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj) => {
                const gallery = proj.gallery_urls && proj.gallery_urls.length > 0 ? proj.gallery_urls : [proj.image_url];
                return (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-4 space-x-reverse overflow-hidden shrink-0">
                          {gallery.slice(0, 3).map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm inline-block" />
                          ))}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{proj.title_ar}</div>
                          <div className="text-[10px] text-slate-500">معرض: {gallery.length} صور</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{proj.client_name_ar || 'غير محدد'}</div>
                      <div className="text-[11px] text-slate-500">{proj.location_ar}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-700">{proj.year}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        proj.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {proj.is_published ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(proj)}
                          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا المشروع؟')) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingProject ? 'تعديل مشروع ومعرض الصور' : 'إضافة مشروع جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم المشروع (عربي)</label>
                <input
                  type="text"
                  required
                  value={formData.title_ar}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم المشروع (إنجليزي)</label>
                <input
                  type="text"
                  required
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">العميل (عربي)</label>
                  <input
                    type="text"
                    value={formData.client_name_ar}
                    onChange={(e) => setFormData({ ...formData, client_name_ar: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">سنة التنفيذ</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              {/* Multi Image Uploaders (2 to 3 Images per Project) */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-800 text-xs block border-b pb-2">
                  معرض صور المشروع (رفع من 2 إلى 3 صور لكل مشروع)
                </span>

                <ImageUploadInput
                  label="الصورة الأولى (الرئيسية) *"
                  recommendedSize="1200 × 800 px (3:2 أو 16:9)"
                  value={formData.image_url}
                  onChange={(newUrl) => setFormData({ ...formData, image_url: newUrl })}
                />

                <ImageUploadInput
                  label="الصورة الثانية (إضافية)"
                  recommendedSize="1200 × 800 px (3:2 أو 16:9)"
                  value={formData.image_url2}
                  onChange={(newUrl) => setFormData({ ...formData, image_url2: newUrl })}
                />

                <ImageUploadInput
                  label="الصورة الثالثة (إضافية)"
                  recommendedSize="1200 × 800 px (3:2 أو 16:9)"
                  value={formData.image_url3}
                  onChange={(newUrl) => setFormData({ ...formData, image_url3: newUrl })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">وصف المشروع (عربي)</label>
                <textarea
                  rows={2}
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="proj-publish"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                <label htmlFor="proj-publish" className="font-bold text-slate-700">نشر المشروع في سابقة الأعمال</label>
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
                  className="px-5 py-2 bg-[#2B3990] text-white rounded-xl font-bold"
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
