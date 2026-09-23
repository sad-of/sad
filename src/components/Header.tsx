import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  ShieldCheck, 
  Menu, 
  X,
  SlidersHorizontal,
  Gamepad2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    cartCount, 
    cartSubtotal,
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    activeSection,
    setActiveSection,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (section: 'store' | 'about' | 'contact' | 'admin', category?: string) => {
    setActiveSection(section);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 dark:bg-blue-950 text-slate-300 dark:text-blue-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800 dark:border-blue-900/60">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">شريك التجزئة المعتمد لأجهزة بلايستيشن الأصلية</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">ضمان رسمي سنتين على كافة أجهزة الكونسول</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden sm:inline">توصيل سريع لكافة محافظات العراق · أسعار مناسبة</span>
            <button 
              onClick={() => handleNavClick('admin')}
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>لوحة تحكم الإدارة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main One-Row, Three-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('store', 'all')}
          className="flex items-center gap-2.5 group text-right shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              سعد <span className="text-blue-600 dark:text-blue-400">للإلكترونيات</span>
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase -mt-1 hidden sm:block">
              SAAD ELECTRONICS
            </span>
          </div>
        </button>

        {/* Search Bar in Middle on Desktop (or Toggle) */}
        {showSearchInput ? (
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative animate-in fade-in duration-150">
            <Search className="w-4 h-4 absolute right-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن بلايستيشن 5، دوال سينس، شاشات، ألعاب..."
              autoFocus
              className="w-full pr-9 pl-8 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            />
            <button 
              onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
              className="absolute left-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Zone 2: Navigation Links */
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('store', 'all')}
              className={`transition-colors whitespace-nowrap ${
                activeSection === 'store' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              المتجر الرئيسي
            </button>
            <button
              onClick={() => handleNavClick('store', 'consoles')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              أجهزة الكونسول
            </button>
            <button
              onClick={() => handleNavClick('store', 'controllers')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              أجهزة التحكم وVR
            </button>
            <button
              onClick={() => handleNavClick('store', 'displays')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              الشاشات والصوتيات
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap ${
                activeSection === 'about' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              من نحن
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors whitespace-nowrap ${
                activeSection === 'contact' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              اتصل بنا والفروع
            </button>
          </nav>
        )}

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search toggle if input closed */}
          {!showSearchInput && (
            <button
              onClick={() => setShowSearchInput(true)}
              aria-label="البحث في المنتجات"
              title="البحث في المنتجات"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Theme Switcher Day / Night */}
          <button
            onClick={toggleTheme}
            aria-label={`التبديل إلى الوضع ${theme === 'dark' ? 'النهاري' : 'الليلي'}`}
            title={`التبديل إلى الوضع ${theme === 'dark' ? 'النهاري' : 'الليلي'}`}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="قائمة المفضلة"
            title="قائمة المفضلة"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 left-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="سلة المشتريات"
            title="سلة المشتريات"
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg transition-all font-medium text-sm shadow-sm"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-2 w-4 h-4 bg-white text-blue-700 text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline tabular-nums font-semibold">
              {cartSubtotal.toLocaleString()} د.ع
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="فتح القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المنتجات..."
              className="w-full pr-9 pl-3 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
            />
          </div>

          <div className="flex flex-col space-y-2 pt-2 text-sm font-medium text-right">
            <button
              onClick={() => handleNavClick('store', 'all')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              جميع المنتجات والإلكترونيات
            </button>
            <button
              onClick={() => handleNavClick('store', 'consoles')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              أجهزة بلايستيشن 5
            </button>
            <button
              onClick={() => handleNavClick('store', 'controllers')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              أجهزة التحكم دوال سينس وVR
            </button>
            <button
              onClick={() => handleNavClick('store', 'displays')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              شاشات الألعاب والصوتيات
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              من نحن - سعد للإلكترونيات
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-right px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              فروعنا والتواصل المباشر
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-right px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold flex items-center justify-between"
            >
              <span>لوحة إدارة المتجر والمخزون</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
