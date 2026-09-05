import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import Logo from './Logo';
import { FileText, Download, ExternalLink, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { openPdfDocument } from '../utils/openDocument';

export default function CompanyProfileModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const { settings } = useData();
  const [blobUrl, setBlobUrl] = useState('');

  const profileUrl = settings.company_profile_url || '';

  useEffect(() => {
    if (!profileUrl) {
      setBlobUrl('');
      return;
    }

    if (profileUrl.startsWith('data:')) {
      try {
        const parts = profileUrl.split(';base64,');
        const contentType = parts[0].replace('data:', '') || 'application/pdf';
        const base64Data = parts[1] || '';
        const binaryStr = window.atob(base64Data);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: contentType });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error('Error generating blob URL for modal:', err);
        setBlobUrl(profileUrl);
      }
    } else {
      setBlobUrl(profileUrl);
    }
  }, [profileUrl]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!profileUrl) {
      alert(lang === 'ar' ? 'لم يتم رفع ملف البروفايل بعد.' : 'No profile PDF uploaded yet.');
      return;
    }

    const downloadUrl = blobUrl || profileUrl;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'Alaman-Technology-Company-Profile.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenExternal = () => {
    openPdfDocument(profileUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header Bar */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800 text-[#E31E24] flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base font-cairo flex items-center gap-2">
                <span>{lang === 'ar' ? 'البروفايل التعريفي للشركة (Company Profile PDF)' : 'Company Profile (PDF)'}</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-sans font-semibold hidden sm:inline-block">
                  PDF Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'شركة تقنية الأمان الأولى المحدودة — المملكة العربية السعودية' : 'Al-Aman Al-Awal Technology Co. Ltd. — Saudi Arabia'}
              </p>
            </div>
          </div>

          {/* Header Actions & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              title={lang === 'ar' ? 'تحميل ملف PDF' : 'Download PDF'}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تحميل البروفايل PDF' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handleOpenExternal}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              title={lang === 'ar' ? 'فتح في نافذة جديدة' : 'Open in New Window'}
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Body: PDF Reader or Direct Action View */}
        <div className="flex-1 bg-slate-900 relative flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
          {blobUrl ? (
            <object
              data={blobUrl}
              type="application/pdf"
              className="w-full h-full rounded-2xl bg-slate-900 border border-slate-800 shadow-inner"
            >
              <iframe
                src={blobUrl}
                title="Company Profile PDF"
                className="w-full h-full rounded-2xl border-0"
              >
                <div className="py-16 text-center text-white space-y-6 max-w-md mx-auto">
                  <FileText className="w-16 h-16 text-[#E31E24] mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-cairo">
                      {lang === 'ar' ? 'البروفايل التعريفي جاهز للتحميل والتصفح' : 'Company Profile PDF is Ready'}
                    </h3>
                    <p className="text-slate-300 text-xs">
                      {lang === 'ar'
                        ? 'انقر على الزر أدناه لتحميل ملف البروفايل PDF فوراً على جهازك.'
                        : 'Click below to download the official company profile PDF.'}
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 bg-[#E31E24] hover:bg-[#C41419] text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>{lang === 'ar' ? 'تحميل البروفايل PDF مباشرة' : 'Download Profile PDF'}</span>
                  </button>
                </div>
              </iframe>
            </object>
          ) : (
            <div className="py-16 text-center text-white space-y-4 max-w-md mx-auto">
              <ShieldCheck className="w-16 h-16 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold">
                {lang === 'ar' ? 'لم يتم رفع البروفايل التعريفي بعد' : 'No Profile Document Uploaded Yet'}
              </h3>
              <p className="text-slate-400 text-xs">
                {lang === 'ar'
                  ? 'يرجى الدخول إلى لوحة التحكم — قسم الإعدادات لرفع ملف البروفايل التعريفي PDF.'
                  : 'Please log into Admin Settings to upload the official Company Profile PDF.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Banner */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'المستند المعتمد لشركة تقنية الأمان الأولى المحدودة' : 'Official Document of Al-Aman Al-Awal Technology Co.'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="text-[#E31E24] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل المستند' : 'Download File'}</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
