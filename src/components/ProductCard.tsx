import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialProducts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct,
    cart
  } = useStore();

  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const categoryName = CATEGORIES.find(c => c.id === product.category)?.name || product.category;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#0c1424] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_10px_35px_rgba(14,165,233,0.12)] transition-all duration-300 text-right">
      {/* Visual Product Surface */}
      <div className="relative aspect-[4/3] w-full bg-linear-to-b from-slate-100 to-slate-200/60 dark:from-slate-950 dark:to-[#070b14] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle Tag top-right in RTL */}
        {product.tag && (
          <div className="absolute top-3 right-3 z-10 text-[11px] font-bold tracking-wide uppercase text-blue-600 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/90 border border-blue-100 dark:border-cyan-900/40 px-2.5 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
            {product.tag}
          </div>
        )}

        {/* Wishlist button top-left in RTL */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          className="absolute top-3 left-3 z-10 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-500 hover:text-red-500 dark:hover:text-red-400 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xs transition-colors shadow-xs"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
            if (target.parentElement) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 p-4 text-center';
              fallback.innerHTML = `
                <div class="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mb-2">سعد</div>
                <span class="text-xs font-medium">${product.name}</span>
              `;
              target.parentElement.appendChild(fallback);
            }
          }}
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={() => setSelectedProduct(product)}
            className="w-full py-2 px-3 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>نظرة سريعة والمواصفات</span>
          </button>
        </div>
      </div>

      {/* Product Content & Pricing */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category and rating metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-blue-600 dark:text-cyan-400">{categoryName}</span>
            <div className="flex items-center gap-1" dir="ltr">
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">({product.reviewCount})</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {product.name}
          </h3>

          {/* Key specs */}
          {product.shortSpecs && product.shortSpecs.length > 0 && (
            <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {product.shortSpecs.slice(0, 2).join(' · ')}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col text-right">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">د.ع</span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 line-through tabular-nums">
                  <span>{product.originalPrice.toLocaleString()}</span>
                  <span>د.ع</span>
                </div>
              )}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              {product.stock > 0 ? `متوفر بالمخزون (${product.stock} قطعة)` : 'نفدت الكمية'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
              inCartQty > 0 
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/50 hover:bg-blue-100'
                : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_10px_rgba(37,99,235,0.25)]'
            }`}
          >
            {inCartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>في السلة ({inCartQty})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
