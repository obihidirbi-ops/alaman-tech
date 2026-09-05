import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Building2, Calendar, MapPin, CheckCircle, Eye, Images, X, ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProjectsCatalog() {
  const { t, lang, isRTL } = useLanguage();
  const { projects, services } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Lightbox Modal state for full gallery viewing
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Active image tracker for individual project cards
  const [cardActiveImageMap, setCardActiveImageMap] = useState({});

  const publishedProjects = projects.filter(p => p.is_published);

  const filteredProjects = selectedCategory === 'all'
    ? publishedProjects
    : publishedProjects.filter(p => p.category_id === selectedCategory);

  const openLightbox = (proj, initialIdx = 0) => {
    setActiveModalProject(proj);
    setActiveImageIndex(initialIdx);
  };

  const getGallery = (proj) => {
    if (proj.gallery_urls && proj.gallery_urls.length > 0) return proj.gallery_urls;
    return [proj.image_url];
  };

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-10 sm:p-14 rounded-3xl space-y-4">
        <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 px-3 py-1 rounded-md border border-red-800">
          {t('projectsBadge')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cairo">
          {t('projectsTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          {t('projectsSubtitle')}
        </p>

        {/* Category Filters */}
        <div className="pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#E31E24] text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t('allCategories')}
          </button>
          {services.map((serv) => (
            <button
              key={serv.id}
              onClick={() => setSelectedCategory(serv.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === serv.slug
                  ? 'bg-[#E31E24] text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lang === 'ar' ? serv.title_ar : serv.title_en}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => {
          const gallery = getGallery(proj);
          const currentCardImgIdx = cardActiveImageMap[proj.id] || 0;
          const currentImg = gallery[currentCardImgIdx] || proj.image_url;

          return (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Main Display Image */}
                <div className="relative h-60 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => openLightbox(proj, currentCardImgIdx)}>
                  <img
                    src={currentImg}
                    alt={lang === 'ar' ? proj.title_ar : proj.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 end-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {proj.year}
                  </div>

                  {/* Gallery Count Badge */}
                  <div className="absolute bottom-3 start-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                    <Images className="w-3.5 h-3.5 text-[#E31E24]" />
                    <span>{gallery.length} {lang === 'ar' ? 'صور للمشروع' : 'Project Photos'}</span>
                  </div>
                </div>

                {/* Thumbnails Gallery Selector (2 to 3 photos) */}
                {gallery.length > 1 && (
                  <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
                    {gallery.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCardActiveImageMap({ ...cardActiveImageMap, [proj.id]: idx })}
                        className={`relative w-14 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          currentCardImgIdx === idx ? 'border-[#E31E24] shadow' : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#E31E24]" />
                      <span>{lang === 'ar' ? proj.location_ar : proj.location_en}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2B3990] transition-colors">
                      {lang === 'ar' ? proj.title_ar : proj.title_en}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'ar' ? proj.description_ar : proj.description_en}
                  </p>

                  <div className="space-y-1 pt-2 text-xs text-slate-500">
                    <div><strong>{t('projectClient')}</strong> {lang === 'ar' ? proj.client_name_ar : proj.client_name_en}</div>
                    <div><strong>{t('projectStatus')}</strong> <span className="text-emerald-600 font-bold">{lang === 'ar' ? proj.status_ar : proj.status_en}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.services_used.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button to view gallery */}
                  <div className="pt-2">
                    <button
                      onClick={() => openLightbox(proj, currentCardImgIdx)}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-[#2B3990] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>عرض معرض صور المشروع ({gallery.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-lg font-cairo">
                  {lang === 'ar' ? activeModalProject.title_ar : activeModalProject.title_en}
                </h3>
                <p className="text-xs text-slate-400">
                  صورة {activeImageIndex + 1} من {getGallery(activeModalProject).length}
                </p>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Display Image */}
            <div className="relative h-[380px] sm:h-[500px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={getGallery(activeModalProject)[activeImageIndex]}
                alt=""
                className="max-h-full max-w-full object-contain"
              />

              {/* Navigation Arrows */}
              {getGallery(activeModalProject).length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : getGallery(activeModalProject).length - 1))}
                    className="absolute start-4 bg-slate-900/80 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg border border-slate-700"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < getGallery(activeModalProject).length - 1 ? prev + 1 : 0))}
                    className="absolute end-4 bg-slate-900/80 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg border border-slate-700"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Gallery Thumbnails Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-3 overflow-x-auto">
              {getGallery(activeModalProject).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-[#E31E24] scale-105 shadow-lg' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
