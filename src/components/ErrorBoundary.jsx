import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-tajawal">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-950/80 border border-red-800 text-[#E31E24] rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black font-cairo text-white">
                شركة تقنية الأمان الأولى المحدودة
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                First Security Technology Co. Ltd.
              </p>
              <p className="text-slate-300 text-xs pt-1">
                حدث استثناء فني غير متوقع. يرجى تحديث الصفحة أو العودة للرئيسية.
              </p>
              <p className="text-slate-400 text-xs">
                An unexpected error occurred. Please reload the page or return home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 bg-[#E31E24] hover:bg-[#C41419] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة تحميل / Reload</span>
              </button>

              <button
                onClick={this.handleHome}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl border border-slate-600 flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>الرئيسية / Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
