import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialProducts';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(1500000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'controllers') {
            if (p.category !== 'controllers' && p.category !== 'vr') return false;
          } else if (selectedCategory === 'displays') {
            if (p.category !== 'displays' && p.category !== 'audio') return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }
        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchSpecs = p.shortSpecs?.some(s => s.toLowerCase().includes(query));
          if (!matchName && !matchDesc && !matchSpecs) return false;
        }
        // In-stock filter
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        // Max price filter
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default 'featured'
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPrice(1500000);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-12 lg:py-16 bg-slate-50/50 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 text-right">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
              <span>أجهزة بلي ستيشن وإلكترونيات أصلية</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              كتالوج المنتجات وأسعار الدينار العراقي
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              محل سعد للبلي والإلكترونيات - أسعار مناسبة وضمان حقيقي منذ عام 1996
            </p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            عرض <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> من أصل {products.length} منتج
          </div>
        </div>

        {/* Category Navigation Bar (Segmented Controls) */}
        <div className="pt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/90 dark:border-slate-800 hover:border-blue-400'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters Bar: Search, Price Slider, Stock Toggle & Sort */}
        <div className="mt-4 p-4 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center shadow-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو المواصفات..."
              className="w-full pr-9 pl-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            />
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-1 text-right">
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>أقصى ميزانية:</span>
              <span className="font-bold text-blue-600 dark:text-cyan-400 tabular-nums">
                {maxPrice.toLocaleString()} د.ع
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="1500000"
              step="25000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* In-Stock Toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>المتوفر في المخزون فقط</span>
            </label>
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2 justify-start sm:justify-end">
            <span className="text-xs text-slate-400 whitespace-nowrap">الترتيب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            >
              <option value="featured">المميز / الأكثر تطابقاً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً من اللاعبين</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="mt-12 py-16 px-4 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              لم يتم العثور على أجهزة مطابقة لخياراتك
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              جرب تغيير كلمات البحث، أو زيادة نطاق الميزانية، أو إعادة تعيين الفلاتر لعرض كافة المنتجات المتوفرة.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين كافة الفلاتر</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
