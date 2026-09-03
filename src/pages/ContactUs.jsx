import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const { t, lang } = useLanguage();
  const { settings, submitInboxMessage, services } = useData();

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    service_slug: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Save in state & LocalStorage inbox
      submitInboxMessage({
        type: 'contact',
        ...formData
      });

      // Trigger automatic mailto client dispatch to Info@alamantec.com & alamansmm@gmail.com
      const mailSubject = encodeURIComponent(`رسالة استفسار جديدة من: ${formData.full_name}`);
      const mailBody = encodeURIComponent(
        `الاسم الكامل: ${formData.full_name}\n` +
        `اسم الشركة: ${formData.company_name}\n` +
        `رقم الجوال: ${formData.phone}\n` +
        `البريد الإلكتروني: ${formData.email}\n` +
        `نص الرسالة والاستفسار:\n${formData.message}`
      );

      window.location.href = `mailto:Info@alamantec.com,alamansmm@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const rawWhatsapp = (settings.whatsapp || '966539988289').replace(/[^0-9]/g, '');

  const whatsappMessage = encodeURIComponent(
    `مرحباً شركة تقنية الأمان الأولى المحدودة، أرغب في الاستفسار عن طريق موقعكم:\n` +
    `👤 الاسم: ${formData.full_name}\n` +
    `🏢 الشركة: ${formData.company_name}\n` +
    `📞 الجوال: ${formData.phone}\n` +
    `📝 الرسالة: ${formData.message}`
  );

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-10 sm:p-14 rounded-3xl space-y-4 shadow-xl border border-slate-800">
        <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-950 px-3 py-1 rounded-md border border-red-800">
          {t('contact')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cairo">
          {t('contactTitle')}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-cairo border-b pb-3 border-slate-100">
              معلومات الاتصال المباشر
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E31E24] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-500">المقر الرئيسي:</div>
                  <div className="font-bold text-slate-900 leading-relaxed">
                    الدمام — طريق الجبيل الظهران السريع، مبنى 8434
                  </div>
                </div>
              </div>

              {/* Phone Calls */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2B3990] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-500">أرقام الاتصال المباشر:</div>
                  <div className="space-y-1 pt-1 font-mono font-bold text-slate-900">
                    <div>
                      <a href="tel:+966557845724" dir="ltr" className="hover:text-[#E31E24] transition-colors">
                        +966 55 784 5724
                      </a>
                    </div>
                    <div>
                      <a href="tel:+966138207277" dir="ltr" className="hover:text-[#2B3990] transition-colors">
                        +966 13 820 7277
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-500">محادثة واتساب المباشرة:</div>
                  <a
                    href={`https://wa.me/${rawWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-block pt-1"
                    dir="ltr"
                  >
                    +966 53 998 8289
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E31E24] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-500">البريد الإلكتروني الرسمي:</div>
                  <div className="space-y-1 pt-1 font-mono font-bold text-slate-900">
                    <div>
                      <a href="mailto:Info@alamantec.com" className="hover:text-[#E31E24] transition-colors">
                        Info@alamantec.com
                      </a>
                    </div>
                    <div>
                      <a href="mailto:alamansmm@gmail.com" className="hover:text-[#2B3990] transition-colors">
                        alamansmm@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-500">أوقات العمل:</div>
                  <div className="font-bold text-slate-900">
                    {lang === 'ar' ? settings.working_hours_ar : settings.working_hours_en}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Official Social Links Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 shadow-lg">
            <h4 className="font-bold text-sm font-cairo text-slate-200">
              تابعونا على منصات التواصل الاجتماعي:
            </h4>
            <div className="flex flex-wrap gap-2">
              <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-[#E31E24] text-xs font-bold rounded-lg transition-colors">
                TikTok
              </a>
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-[#2B3990] text-xs font-bold rounded-lg transition-colors">
                Facebook
              </a>
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-pink-600 text-xs font-bold rounded-lg transition-colors">
                Instagram
              </a>
              <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-sky-500 text-xs font-bold rounded-lg transition-colors">
                Twitter (X)
              </a>
              <a href={settings.snapchat_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 text-xs font-bold rounded-lg transition-colors">
                Snapchat
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-cairo border-b pb-3 border-slate-100">
              إرسال استفسار مباشر
            </h3>

            {submitted ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-slate-900 font-cairo">
                    تم إرسال استفسارك بنجاح!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    تم توجيه الرسالة آلياً إلى بريد الشركة الرسمي (<span className="font-mono text-[#E31E24] font-bold">Info@alamantec.com</span> و <span className="font-mono text-[#2B3990] font-bold">alamansmm@gmail.com</span>) وسيجيبكم فريق العمل فوراً.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={`https://wa.me/${rawWhatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>متابعة الاستفسار عبر الواتساب</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('fullName')} *</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E31E24]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('companyName')}</label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E31E24]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('emailAddress')} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E31E24]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('phone')} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E31E24]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">نص الرسالة أو الاستفسار *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E31E24]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>جاري إرسال الرسالة والبريد...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال الرسالة إلى شركة الأمان الأولى</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
