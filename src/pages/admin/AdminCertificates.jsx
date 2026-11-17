import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import ImageUploadInput from '../../components/ImageUploadInput';
import { 
  Award, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  FileCheck2, 
  Building2, 
  Search, 
  ShieldCheck, 
  Building,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminCertificates() {
  const { lang } = useLanguage();
  const { 
    certificates, 
    saveCertificate, 
    deleteCertificate,
    accreditationLogos,
    saveAccreditationLogo,
    deleteAccreditationLogo
  } = useData();

  // Active view tab: 'certs' for official certificate documents, 'logos' for accredited entity logos
  const [activeView, setActiveView] = useState('certs');

  // Search and category filter for certificates
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Certificate Modal State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    id: '',
    category: 'security_defense',
    title_ar: '',
    title_en: '',
    authority_ar: '',
    authority_en: '',
    license_no: '',
    badge_ar: '',
    badge_en: '',
    badge_color: 'red',
    image_url: '',
    featured: true,
    sort_order: 1
  });

  // Authority Logo Modal State
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [logoForm, setLogoForm] = useState({
    id: '',
    name_ar: '',
    name_en: '',
    badge_ar: '',
    badge_en: '',
    tag: '',
    logo_url: '',
    is_active: true,
    sort_order: 1
  });

  // Certificate Categories
  const categories = [
    { id: 'all', label_ar: 'الكل', label_en: 'All' },
    { id: 'security_defense', label_ar: 'الأمن الصناعي والدفاع المدني', label_en: 'Security & Civil Defense' },
    { id: 'iso', label_ar: 'شهادات الآيزو (ISO)', label_en: 'ISO Standards' },
    { id: 'corporate_authorities', label_ar: 'أرامكو وهيئة المقاولين', label_en: 'Aramco & SCA' },
    { id: 'commercial_licenses', label_ar: 'التراخيص والسجلات', label_en: 'Commercial Licenses' }
  ];

  // Filtered Certificates
  const filteredCertificates = (certificates || []).filter(cert => {
    const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      (cert.title_ar && cert.title_ar.toLowerCase().includes(q)) ||
      (cert.title_en && cert.title_en.toLowerCase().includes(q)) ||
      (cert.license_no && cert.license_no.toLowerCase().includes(q)) ||
      (cert.authority_ar && cert.authority_ar.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  // Open Certificate Modal
  const handleOpenCertModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        id: cert.id,
        category: cert.category || 'security_defense',
        title_ar: cert.title_ar || '',
        title_en: cert.title_en || '',
        authority_ar: cert.authority_ar || '',
        authority_en: cert.authority_en || '',
        license_no: cert.license_no || '',
        badge_ar: cert.badge_ar || '',
        badge_en: cert.badge_en || '',
        badge_color: cert.badge_color || 'red',
        image_url: cert.image_url || '',
        featured: cert.featured !== false,
        sort_order: cert.sort_order || 1
      });
    } else {
      setEditingCert(null);
      setCertForm({
        id: '',
        category: 'security_defense',
        title_ar: '',
        title_en: '',
        authority_ar: '',
        authority_en: '',
        license_no: '',
        badge_ar: 'معتمد',
        badge_en: 'Accredited',
        badge_color: 'red',
        image_url: '',
        featured: true,
        sort_order: (certificates?.length || 0) + 1
      });
    }
    setCertModalOpen(true);
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title_ar || !certForm.image_url) {
      alert('يرجى إدخال عنوان الوثيقة ورفع صورتها.');
      return;
    }
    saveCertificate(certForm);
    setCertModalOpen(false);
  };

  const handleDeleteCert = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الوثيقة / الشهادة؟')) {
      deleteCertificate(id);
    }
  };

  // Open Authority Logo Modal
  const handleOpenLogoModal = (item = null) => {
    if (item) {
      setEditingLogo(item);
      setLogoForm({
        id: item.id,
        name_ar: item.name_ar || '',
        name_en: item.name_en || '',
        badge_ar: item.badge_ar || '',
        badge_en: item.badge_en || '',
        tag: item.tag || '',
        logo_url: item.logo_url || '',
        is_active: item.is_active !== false,
        sort_order: item.sort_order || 1
      });
    } else {
      setEditingLogo(null);
      setLogoForm({
        id: '',
        name_ar: '',
        name_en: '',
        badge_ar: 'معتمد',
        badge_en: 'Approved',
        tag: 'جهة اعتماد',
        logo_url: '',
        is_active: true,
        sort_order: (accreditationLogos?.length || 0) + 1
      });
    }
    setLogoModalOpen(true);
  };

  const handleSaveLogo = (e) => {
    e.preventDefault();
    if (!logoForm.name_ar || !logoForm.logo_url) {
      alert('يرجى إدخال اسم الجهة ورفع شعارها.');
      return;
    }
    saveAccreditationLogo(logoForm);
    setLogoModalOpen(false);
  };

  const handleDeleteLogo = (id) => {
    if (window.confirm('هل أنت متأكد من حذف شعار هذه الجهة المعتمدة؟')) {
      deleteAccreditationLogo(id);
    }
  };

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-[#E31E24]">
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 font-cairo">
              إدارة الشهادات والاعتمادات وشعارات الجهات
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            إضافة وتعديل وثائق التراخيص والاعتمادات الرسمية (HCIS, ISO, أرامكو، الدفاع المدني) وشعارات الجهات المعتمدة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeView === 'certs' ? (
            <button
              onClick={() => handleOpenCertModal()}
              className="px-4 py-2.5 bg-[#E31E24] hover:bg-[#C41419] text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة وثيقة / شهادة</span>
            </button>
          ) : (
            <button
              onClick={() => handleOpenLogoModal()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة شعار جهة اعتماد</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Mode Switcher: Documents vs Logos */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveView('certs')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeView === 'certs'
              ? 'bg-[#2B3990] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>وثائق وشهادات الاعتماد الرسمية</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20 text-white">
            {certificates?.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveView('logos')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeView === 'logos'
              ? 'bg-[#2B3990] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>شعارات الجهات المعتمدة (Logos)</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeView === 'logos' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {accreditationLogos?.length || 0}
          </span>
        </button>
      </div>

      {/* VIEW 1: CERTIFICATES & OFFICIAL DOCUMENTS */}
      {activeView === 'certs' && (
        <div className="space-y-6">
          
          {/* Filters & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ar' ? cat.label_ar : cat.label_en}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم أو الترخيص..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 ps-9 text-xs focus:outline-none focus:border-[#E31E24]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
            </div>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Image Preview */}
                <div className="relative h-48 bg-slate-50 border-b border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={cert.image_url}
                    alt={cert.title_ar}
                    className="max-h-full max-w-full object-contain rounded"
                  />
                  <div className="absolute top-2.5 start-2.5">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${getBadgeStyle(cert.badge_color)}`}>
                      {cert.badge_ar}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 font-cairo">
                      {cert.title_ar}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {cert.authority_ar}
                    </p>
                    <div className="text-[11px] text-slate-600 font-mono mt-1 font-bold">
                      رقم الترخيص: {cert.license_no}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <a
                      href={cert.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>معاينة الصورة</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenCertModal(cert)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                        title="تعديل"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(cert.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
              لا توجد وثائق تطابق بحثك حالياً.
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ACCREDITATION LOGOS SHOWCASE */}
      {activeView === 'logos' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-center justify-between">
            <div>
              <span className="font-bold">شريط شعارات الجهات المعتمدة: </span>
              <span>تظهر هذه الشعارات في شريط مميز بالموقع وتؤكد للزوار والعملاء الاعتمادات والتراخيص الرسمية المعتمدة.</span>
            </div>
            <button
              onClick={() => handleOpenLogoModal()}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة جهة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(accreditationLogos || []).map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.logo_url}
                    alt={item.name_ar}
                    className="w-14 h-14 object-contain rounded-xl border border-slate-200 p-1.5 bg-slate-50 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">{item.name_ar}</div>
                    <div className="text-[11px] text-slate-500 truncate">{item.name_en}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                        {item.badge_ar || 'معتمد'}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] text-slate-400">· {item.tag}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenLogoModal(item)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                    title="تعديل"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteLogo(item.id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CERTIFICATE */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-base font-bold text-slate-900 font-cairo">
                {editingCert ? 'تعديل بيانات الشهادة / الوثيقة' : 'إضافة وثيقة أو شهادة اعتماد جديدة'}
              </h2>
              <button
                onClick={() => setCertModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              
              {/* Category */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">تصنيف الوثيقة</label>
                <select
                  value={certForm.category}
                  onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                  className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold text-xs"
                >
                  <option value="security_defense">الأمن الصناعي والدفاع المدني (HCIS / سلامة)</option>
                  <option value="iso">شهادات الآيزو العالمية (ISO Standards)</option>
                  <option value="corporate_authorities">أرامكو وهيئة المقاولين (Aramco & SCA)</option>
                  <option value="commercial_licenses">التراخيص والسجلات الحكومية (تجارة، بلدي، زكاة)</option>
                </select>
              </div>

              {/* Title Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">عنوان الوثيقة (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={certForm.title_ar}
                    onChange={(e) => setCertForm({ ...certForm, title_ar: e.target.value })}
                    placeholder="مثال: ترخيص الهيئة العليا للأمن الصناعي"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">عنوان الوثيقة (إنجليزي)</label>
                  <input
                    type="text"
                    value={certForm.title_en}
                    onChange={(e) => setCertForm({ ...certForm, title_en: e.target.value })}
                    placeholder="HCIS Firefighting Systems License"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Authority Arabic & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">جهة الإصدار / الاعتماد (عربي)</label>
                  <input
                    type="text"
                    value={certForm.authority_ar}
                    onChange={(e) => setCertForm({ ...certForm, authority_ar: e.target.value })}
                    placeholder="وزارة الداخلية - الهيئة العليا للأمن الصناعي"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">جهة الإصدار (إنجليزي)</label>
                  <input
                    type="text"
                    value={certForm.authority_en}
                    onChange={(e) => setCertForm({ ...certForm, authority_en: e.target.value })}
                    placeholder="High Commission for Industrial Security"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* License Number & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">رقم الترخيص / المرجع</label>
                  <input
                    type="text"
                    value={certForm.license_no}
                    onChange={(e) => setCertForm({ ...certForm, license_no: e.target.value })}
                    placeholder="240211105648"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">نص الشارة المختصر</label>
                  <input
                    type="text"
                    value={certForm.badge_ar}
                    onChange={(e) => setCertForm({ ...certForm, badge_ar: e.target.value })}
                    placeholder="HCIS أمن صناعي"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">لون الشارة</label>
                  <select
                    value={certForm.badge_color}
                    onChange={(e) => setCertForm({ ...certForm, badge_color: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  >
                    <option value="red">أحمر (الأمن الصناعي والإطفاء)</option>
                    <option value="blue">أزرق (أرامكو والآيزو)</option>
                    <option value="emerald">أخضر (الدفاع المدني والتجارة)</option>
                    <option value="purple">بنفسجي (الأنظمة الأمنية)</option>
                    <option value="amber">برتقالي / ذهبي (منشآت والأمن السيبراني)</option>
                  </select>
                </div>
              </div>

              {/* Image Upload Input */}
              <div className="pt-2">
                <ImageUploadInput
                  label="صورة الوثيقة أو الشهادة المعتمدة (عالية الدقة JPG / PNG) *"
                  recommendedSize="1920 × 1080 px أو A4 عالي الدقة"
                  value={certForm.image_url}
                  onChange={(newUrl) => setCertForm({ ...certForm, image_url: newUrl })}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  حفظ الوثيقة
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT ACCREDITATION LOGO */}
      {logoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-base font-bold text-slate-900 font-cairo">
                {editingLogo ? 'تعديل شعار جهة الاعتماد' : 'إضافة شعار جهة اعتماد جديدة'}
              </h2>
              <button
                onClick={() => setLogoModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLogo} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم الجهة (عربي) *</label>
                <input
                  type="text"
                  required
                  value={logoForm.name_ar}
                  onChange={(e) => setLogoForm({ ...logoForm, name_ar: e.target.value })}
                  placeholder="مثال: الهيئة العليا للأمن الصناعي"
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">اسم الجهة (إنجليزي)</label>
                <input
                  type="text"
                  value={logoForm.name_en}
                  onChange={(e) => setLogoForm({ ...logoForm, name_en: e.target.value })}
                  placeholder="High Commission for Industrial Security"
                  className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">الشارة (مثال: اعتماد HCIS)</label>
                  <input
                    type="text"
                    value={logoForm.badge_ar}
                    onChange={(e) => setLogoForm({ ...logoForm, badge_ar: e.target.value })}
                    placeholder="اعتماد HCIS"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">التصنيف أو التابعية</label>
                  <input
                    type="text"
                    value={logoForm.tag}
                    onChange={(e) => setLogoForm({ ...logoForm, tag: e.target.value })}
                    placeholder="وزارة الداخلية"
                    className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <ImageUploadInput
                  label="شعار الجهة (PNG شفاف أو JPG) *"
                  recommendedSize="300 × 300 px"
                  value={logoForm.logo_url}
                  onChange={(newUrl) => setLogoForm({ ...logoForm, logo_url: newUrl })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setLogoModalOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold hover:bg-slate-50 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  حفظ الشعار
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
