import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveSection, setSelectedCategory } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const handleNav = (section: 'store' | 'about' | 'contact' | 'admin', cat?: string) => {
    setActiveSection(section);
    if (cat) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs border-t border-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12 text-right">
        {/* Top Footer: Brand, Mission & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-tight text-white">
                سعد <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400">للإلكترونيات</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              <strong className="text-white block font-bold mb-1">محل بلي وإلكترونيات تأسس منذ عام 1996</strong>
              أقدم وأعرق محل لتجهيز أجهزة بلايستيشن، ملحقات الغيمنغ، صيانة وتطوير، وتعامُل راقٍ وأسعار مناسبة تناسب جميع اللاعبين في العراق.
            </p>

            {/* Social Media Links & Instagram xv8f */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                تابعنا على منصات التواصل الاجتماعي
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram xv8f */}
                <a
                  href="https://instagram.com/xv8f"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="حساب انستغرام xv8f"
                  title="انستغرام @xv8f"
                  className="px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-600 via-pink-600 to-amber-600 text-white flex items-center gap-2 font-bold text-xs hover:opacity-95 shadow-md shadow-pink-600/20 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span dir="ltr">@xv8f</span>
                </a>

                {/* Phone Call Button */}
                <a
                  href="tel:07722337379"
                  aria-label="اتصال هاتفي"
                  title="اتصل بالرقم 07722337379"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                  dir="ltr"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>07722337379</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="قناة يوتيوب سعد للإلكترونيات"
                  title="يوتيوب"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تيك توك سعد للإلكترونيات"
                  title="تيك توك"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-neutral-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.72 1.34-.07 2.51-.94 2.95-2.21.23-.71.25-1.47.25-2.22V.02h.01z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Hardware Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              أقسام المتجر
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('store', 'consoles')} className="hover:text-white transition-colors">
                  أجهزة بلايستيشن 5
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store', 'controllers')} className="hover:text-white transition-colors">
                  وحدات تحكم DualSense
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store', 'vr')} className="hover:text-white transition-colors">
                  نظارات PlayStation VR2
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store', 'displays')} className="hover:text-white transition-colors">
                  شاشات سوني INZONE للألعاب
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store', 'audio')} className="hover:text-white transition-colors">
                  سماعات PULSE الصوتية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('store', 'accessories')} className="hover:text-white transition-colors">
                  ملحقات وتخزين SSD
                </button>
              </li>
            </ul>
          </div>

          {/* Store Information */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              روابط ومعلومات
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  من نحن - قصة سعد للإلكترونيات
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  فروعنا ومعارضنا بالمملكة
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  سياسة الضمان والاسترجاع
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  الدعم الفني واستفسارات الأجهزة
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-blue-400 hover:text-blue-300 font-bold">
                  لوحة تحكم الإدارة (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">
              النشرة الإخبارية وعروض الخصم الحصرية
            </span>
            <p className="text-slate-400 text-xs">
              اشترك معنا لتصلك إشعارات توفر أجهزة PS5 Pro، وأكواد الخصم الخاصة، وأحدث إصدارات الألعاب.
            </p>

            {newsletterSubscribed ? (
              <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تم اشتراكك بنجاح في نشرة عروض سعد للإلكترونيات!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>اشتراك</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Developer Credit & Saad Store Highlight Banner */}
        <div className="rounded-2xl bg-linear-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 p-6 sm:p-7 shadow-xl shadow-blue-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Store Information 1996 */}
            <div className="space-y-2 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold">
                <span>تأسس منذ عام 1996</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>خبرة 30 عاماً في عالم الإلكترونيات</span>
              </div>
              <h3 className="text-white font-display text-lg sm:text-xl font-black">
                سعد للإلكترونيات · محل بلي وإلكترونيات
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                تأسس منذ عام 1996، نلتزم بتقديم أحدث أجهزة بلايستيشن، شاشات الألعاب، ملحقات الغيمنغ وصيانة متخصصة مع تعامُل راقٍ ومصداقية تامة وأسعار مناسبة تناسب الجميع في العراق.
              </p>
            </div>

            {/* Developer Contact Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 text-right w-full lg:w-auto min-w-[320px] space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  تصميم وبرمجة الموقع
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="متاح" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
                  ح
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    مصمم ومبرمج الموقع: <span className="text-cyan-400">حسين محمد</span>
                  </h4>
                  <p className="text-slate-400 text-[11px]">مطور واجهات ومتاجر إلكترونية احترافية</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                {/* Phone Call */}
                <a
                  href="tel:07722337379"
                  className="px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="اتصل برقم الهاتف"
                  dir="ltr"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>07722337379</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/xv8f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-pink-950/60 border border-pink-800/80 hover:bg-pink-900/60 text-pink-300 font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="حساب الانستغرام @xv8f"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span dir="ltr">xv8f</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Partner Seal & Payments */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-right">
            <span>© 2026 سعد للإلكترونيات (تأسس 1996). جميع الحقوق محفوظة.</span>
            <span aria-hidden="true">·</span>
            <span>مصمم ومبرمج الموقع حسين محمد (07722337379 · انستا xv8f)</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">بلايستيشن، PS5، وDualSense هي علامات تجارية مسجلة لشركة سوني.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-slate-400">
            <span className="font-bold text-slate-300">طرق الدفع بالعراق:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">زين كاش</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">كي كارد</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">ماستركارد / فيزا</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-800/60">الدفع عند الاستلام (نقد د.ع)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">بطاقات PSN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
