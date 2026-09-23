import React, { useState } from 'react';
import { X, Trash2, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal,
    setIsCheckoutOpen
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 100000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'SAAD10' || code === 'GAMER10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(discount);
      setPromoMessage({ text: 'تم تطبيق كود خصم محل سعد 10% بنجاح!', isError: false });
    } else if (code === 'PRO50' && cartSubtotal >= 500000) {
      setPromoDiscount(50000);
      setPromoMessage({ text: 'تم تطبيق قسيمة 50,000 د.ع على الأجهزة!', isError: false });
    } else {
      setPromoDiscount(0);
      setPromoMessage({ text: 'رمز غير صالح. جرب استخدام "SAAD10" للحصول على خصم 10%', isError: true });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 5000;
  const finalTotal = Math.max(0, cartSubtotal - promoDiscount + shipping);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-start animate-in fade-in duration-200" dir="rtl">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#0c1424] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              سلة المشتريات
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-cyan-300">
              {cart.reduce((s, i) => s + i.quantity, 0)} منتجات
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="إغلاق السلة"
            title="إغلاق"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-blue-50/70 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
          <div className="flex justify-between font-semibold mb-1.5">
            <span>
              {remainingForFree === 0 
                ? '🎉 مبروك! شحن مجاني وسريع لكافة محافظات العراق' 
                : `أضف بقيمة ${remainingForFree.toLocaleString()} د.ع للشحن المجاني`}
            </span>
            <span className="tabular-nums font-bold text-blue-700 dark:text-cyan-300">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-blue-200/80 dark:bg-blue-900/80 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-linear-to-r from-blue-600 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/80">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-3 text-blue-600 dark:text-cyan-400">
                <Tag className="w-7 h-7" />
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">سلتك فارغة حالياً</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                استكشف أجهزة بلايستيشن 5 الأصلية، اليدات والشاشات بأسعار مناسبة وأضف ما يعجبك.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                تصفح متجر الإلكترونيات
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-950 rounded-xl p-2 flex items-center justify-center shrink-0 border border-slate-200/70 dark:border-slate-800">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="حذف المنتج"
                        title="حذف"
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                      {item.product.price.toLocaleString()} د.ع للقطعة
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-xs">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, -1)}
                        className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 font-bold text-slate-900 dark:text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-black text-slate-900 dark:text-white tabular-nums">
                      {(item.product.price * item.quantity).toLocaleString()} د.ع
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 space-y-4">
            {/* Promo Code input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="رمز الكوبون (جرب SAAD10)"
                  className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  تطبيق
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] font-semibold ${promoMessage.isError ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {cartSubtotal.toLocaleString()} د.ع
                </span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>قيمة الخصم:</span>
                  <span className="tabular-nums">-{promoDiscount.toLocaleString()} د.ع</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>رسوم التوصيل لجميع المحافظات:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {shipping === 0 ? 'مجاناً' : `${shipping.toLocaleString()} د.ع`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>المجموع الإجمالي:</span>
                <span className="text-base font-black text-blue-600 dark:text-cyan-400 tabular-nums">
                  {finalTotal.toLocaleString()} د.ع
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
            >
              <span>متابعة إتمام الطلب والدفع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>محل سعد للبلي والإلكترونيات (تأسس منذ 1996) · ضمان حقيقي</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
