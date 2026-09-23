import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setActiveSection } = useStore();

  const handleExploreConsoles = () => {
    setActiveSection('store');
    setSelectedCategory('consoles');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllGear = () => {
    setActiveSection('store');
    setSelectedCategory('all');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column in RTL: Editorial & Conversion */}
          <div className="lg:col-span-6 space-y-6 text-right">
            {/* 1-line text kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold">سعد للإلكترونيات · تأسس منذ 1996</span>
              <span aria-hidden="true">·</span>
              <span>محل بلي وإلكترونيات وتعامُل وأسعار مناسبة</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              عالم بلايستيشن والإلكترونيات بين يديك بأفضل الأسعار.
            </h1>

            {/* Body copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              أعرق متجر ومحل بلي في العراق منذ عام 1996. نوفر أحدث أجهزة PlayStation 5 Pro الأصلية، وحدات التحكم اللاسلكية DualSense، نظارات الواقع الافتراضي VR2، وشاشات الألعاب فائقة الدقة بأسعار مناسبة بالدينار العراقي وكفالة حقيقية.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExploreConsoles}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm rounded-lg transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span>تسوق بلايستيشن 5 برو</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleViewAllGear}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-lg transition-colors border border-slate-200 dark:border-slate-800 whitespace-nowrap"
              >
                استكشف كافة الإلكترونيات
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">100%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">أجهزة أصلية معتمدة</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">سنتان</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ضمان رسمي معتمد</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">24/7</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">دعم فني واستشارات</p>
              </div>
            </div>
          </div>

          {/* Left Column in RTL: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-video shadow-2xl group">
              <img
                src="/src/assets/images/hero_playstation_setup_1790179795410.jpg"
                alt="منصة ألعاب بلايستيشن 5 برو مع شاشة إنزون ووحدة تحكم دوال سينس"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-blue-900', 'to-slate-950');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

              {/* Bottom label on hero image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  <span>منصة بلايستيشن 5 برو الاحترافية</span>
                </div>
                <span className="text-slate-300 font-mono font-bold tabular-nums">4K 120FPS HDR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
