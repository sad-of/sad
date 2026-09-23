import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart,
    setSelectedProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-r border-slate-200 dark:border-slate-800 text-right"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              قائمة أجهزتي المفضلة
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/80">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">لم تقم بإضافة منتجات للمفضلة بعد</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                انقر على أيقونة القلب على أي جهاز أو ملحق بلايستيشن لحفظه هنا والرجوع إليه لاحقاً.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProduct(product);
                  }}
                  className="w-20 h-20 bg-slate-100 dark:bg-slate-950 rounded-lg p-2 flex items-center justify-center shrink-0 border border-slate-200/70 dark:border-slate-800 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProduct(product);
                    }}
                    className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                    {product.price.toLocaleString()} د.ع
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>إضافة للسلة</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      title="حذف من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
