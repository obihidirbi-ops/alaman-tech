import React, { useState } from 'react';
import { Upload, FileText, X, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

/**
 * DocumentUploadInput Component
 * Allows uploading a local PDF / Document file or providing a direct document URL.
 * Local files are converted to Base64 data URIs so they can be stored and previewed offline.
 */
export default function DocumentUploadInput({
  value,
  onChange,
  label = "الملف التعريفي للشركة (Company Profile PDF)",
  recommendedFormat = "ملف بصيغة PDF (الحجم الموصى به أقل من 5 ميجابايت)",
  placeholder = "ضع رابط ملف البروفايل PDF هنا أو اختر ملفاً من جهازك..."
}) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Calculate human readable file size
    const sizeKB = (file.size / 1024).toFixed(1);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const displaySize = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

    setFileName(file.name);
    setFileSize(displaySize);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      onChange(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFileName('');
    setFileSize('');
    onChange(url);
  };

  const handleClear = () => {
    setFileName('');
    setFileSize('');
    onChange('');
  };

  const isPdfOrData = value && (value.startsWith('data:application/pdf') || value.toLowerCase().includes('.pdf') || value.startsWith('http'));

  return (
    <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-1">
        {label && <label className="font-bold text-slate-800 block text-sm font-cairo">{label}</label>}
        {recommendedFormat && (
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>{recommendedFormat}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Direct URL Input */}
        <input
          type="text"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder={placeholder}
          className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#E31E24] shadow-sm font-mono"
        />

        {/* Local File Selector Button */}
        <label className="cursor-pointer bg-[#2B3990] hover:bg-[#1E286C] text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0">
          <Upload className="w-4 h-4" />
          <span>اختر ملف البروفايل من جهازك</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Document Active Info & Test Preview Box */}
      {value && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-emerald-200 rounded-xl shadow-sm mt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>{fileName || 'تم رفع الملف التعريفي للشركة'}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {fileSize ? `حجم الملف: ${fileSize}` : (value.length > 100 ? `رمز بياني جاهز للتحميل` : value)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>تصفح الملف الآن</span>
            </a>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="إزالة الملف"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
