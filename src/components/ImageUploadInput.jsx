import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Info } from 'lucide-react';

/**
 * ImageUploadInput Component with Automatic Canvas Image Compression & Resizing.
 * Prevents LocalStorage QuotaExceededError by compressing uploaded device images 
 * down to lightweight optimized Base64 strings (< 150KB).
 */
export default function ImageUploadInput({
  value,
  onChange,
  label = "صورة الخدمة / المشروع",
  recommendedSize = "1200 × 800 px (نسبة 16:9 أو 4:3 - JPG/PNG)",
  placeholder = "ضع رابط الصورة هنا أو اختر من جهازك..."
}) {
  const [preview, setPreview] = useState(value || '');

  const compressAndSetImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize canvas max bounds to 1000px
        const maxDimension = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to webp / jpeg / png (0.85 quality)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        setPreview(compressedBase64);
        onChange(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressAndSetImage(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-1">
        {label && <label className="font-bold text-slate-800 block">{label}</label>}
        {recommendedSize && (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>المقاس الموصى به: <strong>{recommendedSize}</strong></span>
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* URL Input */}
        <input
          type="text"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder={placeholder}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#E31E24]"
        />

        {/* Local File Upload Button */}
        <label className="cursor-pointer bg-[#2B3990] hover:bg-[#1E286C] text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0">
          <Upload className="w-4 h-4" />
          <span>اختر صورة من جهازك</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Instant Image Preview */}
      {preview && (
        <div className="relative w-36 h-20 rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-100 group mt-2">
          <img src={preview} alt="معاينة الصورة" className="w-full h-full object-contain p-1" />
          <button
            type="button"
            onClick={() => {
              setPreview('');
              onChange('');
            }}
            className="absolute top-1 end-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
            title="إزالة الصورة"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
