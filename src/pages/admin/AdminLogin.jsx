import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import Logo from '../../components/Logo';
import { Lock, User, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { t, lang } = useLanguage();
  const { adminLogin } = useData();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = adminLogin(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl">
        <div className="text-center space-y-3">
          <Logo showText={true} className="h-14 mx-auto justify-center" />
          <h2 className="text-2xl font-extrabold text-slate-900 font-cairo">
            {t('adminLoginTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('adminLoginSubtitle')}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">{t('username')}</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 ps-10 text-sm focus:outline-none focus:border-[#E31E24]"
              />
              <User className="w-4 h-4 text-slate-400 absolute start-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">{t('password')}</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 ps-10 text-sm focus:outline-none focus:border-[#E31E24]"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute start-3 top-3.5" />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div><strong>بيانات التجربة التوضيحية:</strong></div>
            <div>اسم المستخدم: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono">admin</code></div>
            <div>كلمة المرور: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono">admin123</code></div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#E31E24] to-[#2B3990] text-white font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all"
          >
            {t('loginBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
