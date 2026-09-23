import React, { useState } from 'react';
import { X, Star, Shield, Truck, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialProducts';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    cart
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isFavorite = isInWishlist(selectedProduct.id);
  const cartItem = cart.find(item => item.product.id === selectedProduct.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const categoryName = CATEGORIES.find(c => c.id === selectedProduct.category)?.name || selectedProduct.category;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200" dir="rtl">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button on top-left in RTL */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="إغلاق نافذة المنتج"
          title="إغلاق"
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Visual Column */}
          <div className="md:col-span-6 bg-slate-100/70 dark:bg-slate-950 p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-800">
            {selectedProduct.tag && (
              <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded">
                {selectedProduct.tag}
              </div>
            )}
            
            <div className="w-full aspect-square max-w-sm flex items-center justify-center relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain drop-shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center';
                    fallback.innerHTML = `
                      <div class="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mb-2">سعد</div>
                      <span class="text-sm font-semibold">${selectedProduct.name}</span>
                    `;
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Quick trust badges */}
            <div className="w-full mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span>ضمان سنتين رسمي</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span>توصيل سريع ومؤمن</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span>استرجاع خلال 14 يوماً</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {categoryName}
                </span>
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300" dir="ltr">
                  <span className="text-slate-400">({selectedProduct.reviewCount} تقييم)</span>
                  <span className="font-bold tabular-nums">{selectedProduct.rating.toFixed(1)}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Pricing row */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                    {selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-cyan-400">د.ع</span>
                </div>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <>
                    <div className="flex items-center gap-1 text-sm text-slate-400 line-through tabular-nums">
                      <span>{selectedProduct.originalPrice.toLocaleString()}</span>
                      <span>د.ع</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      وفر {(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()} د.ع
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Hardware Specifications Table */}
              {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    المواصفات التقنية الكاملة
                  </h4>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-xs divide-y divide-slate-200 dark:divide-slate-800">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="flex px-3 py-2 bg-slate-50/50 dark:bg-slate-950/40">
                        <span className="w-2/5 text-slate-500 dark:text-slate-400 font-semibold">{spec.name}</span>
                        <span className="w-3/5 text-slate-800 dark:text-slate-200 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In The Box */}
              {selectedProduct.inTheBox && selectedProduct.inTheBox.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    محتويات العلبة والصندوق
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {selectedProduct.inTheBox.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Purchase Module */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>حالة التوفر بالمخزون:</span>
                <span className={`font-bold ${selectedProduct.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {selectedProduct.stock > 0 ? `متوفر في المخزن (${selectedProduct.stock} قطعة متبقية)` : 'نفدت الكمية حالياً'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 text-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 font-bold text-slate-900 dark:text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock}
                    className="px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className="flex-1 py-2.5 px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {inCartQty > 0 ? `زيادة الكمية (${inCartQty} بالسلة)` : `أضف إلى السلة · ${(selectedProduct.price * quantity).toLocaleString()} د.ع`}
                  </span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  aria-label="إضافة للمفضلة"
                  title="المفضلة"
                  className={`p-2.5 border rounded-lg transition-colors ${
                    isFavorite 
                      ? 'border-red-300 bg-red-50 dark:bg-red-950/40 text-red-500' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
