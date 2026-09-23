import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, Banknote, Gamepad2, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerDetails, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cartSubtotal, 
    placeOrder 
  } = useStore();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    notes: ''
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 100000;
  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5000;
  const totalAmount = cartSubtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('يرجى تعبئة كافة الحقول الإلزامية الخاصة بمعلومات التوصيل والعميل.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(formData, 0);
      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200" dir="rtl">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#0c1424] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {confirmedOrder ? 'تأكيد اكتمال الطلب' : 'إتمام الطلب والدفع - سعد للإلكترونيات'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {confirmedOrder 
                ? 'شكراً لاختيارك محل سعد للبلي والإلكترونيات (تأسس منذ 1996)' 
                : 'أدخل بيانات التوصيل في بغداد وكافة محافظات العراق'}
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="إغلاق النافذة"
            title="إغلاق"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-black text-slate-900 dark:text-white">
                تم استلام طلبك #{confirmedOrder.id} بنجاح!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                تم تسجيل طلبك في نظام مستودعات محل سعد للبلي والإلكترونيات. سنقوم بالتواصل معك عبر الهاتف للتأكيد وتجهيز الشحن فوراً.
              </p>
            </div>

            {/* Tracking Progress Simulation */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>حالة التجهيز والشحن</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase">{confirmedOrder.status === 'Processing' ? 'قيد التجهيز والتغليف' : confirmedOrder.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded bg-blue-100/60 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 font-bold border border-blue-200 dark:border-blue-900">
                  1. تم تأكيد الطلب
                </div>
                <div className="p-2 rounded bg-slate-200/60 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium">
                  2. تجهيز وفحص الجهاز
                </div>
                <div className="p-2 rounded bg-slate-200/60 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium">
                  3. مع مندوب التوصيل
                </div>
              </div>
            </div>

            {/* Order Summary Receipt */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                المنتجات المطلوبة ({confirmedOrder.items.length})
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span className="line-clamp-1">{it.quantity}x {it.product.name}</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {(it.product.price * it.quantity).toLocaleString()} د.ع
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                <span>المبلغ الإجمالي بالدينار العراقي:</span>
                <span className="text-blue-600 dark:text-cyan-400 tabular-nums">
                  {confirmedOrder.total.toLocaleString()} د.ع
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
              >
                العودة إلى المتجر
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {errorMsg && (
              <div className="p-3 text-xs bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>بيانات الشحن ومعلومات الاتصال</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الاسم الكامل للعميل *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: علي حسن الخفاجي"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    البريد الإلكتروني لاستلام الفاتورة والضمان *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@example.iq"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    رقم الهاتف العراقي للتوصيل *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07722337379"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    المحافظة / المدينة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="مثال: بغداد، البصرة، أربيل، النجف، كربلاء..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    العنوان التفصيلي والمنطقة والشارع وأقرب نقطة دالة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="مثال: الكرادة، شارع العرصات، قرب تقاطع المسبح"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الرمز البريدي (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="10001"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ملاحظات التوصيل (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>طريقة الدفع المتاحة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-200 ring-1 ring-blue-600' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="sr-only"
                  />
                  <Banknote className="w-4 h-4 mb-2 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold">الدفع عند الاستلام (نقد د.ع)</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">ادفع للمندوب عند استلام الجهاز وفحصه</span>
                </label>

                <label className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-200 ring-1 ring-blue-600' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="sr-only"
                  />
                  <CreditCard className="w-4 h-4 mb-2 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold">زين كاش / كي كارد / فيزا</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">تحويل إلكتروني فوري وآمن</span>
                </label>

                <label className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'ps_wallet' 
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-200 ring-1 ring-blue-600' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ps_wallet"
                    checked={formData.paymentMethod === 'ps_wallet'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'ps_wallet' })}
                    className="sr-only"
                  />
                  <Gamepad2 className="w-4 h-4 mb-2 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold">بطاقات ورصيد PlayStation</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">استبدال بطاقات PSN الرسمية</span>
                </label>
              </div>
            </div>

            {/* Clear Payment Terms for Cash on Delivery */}
            {formData.paymentMethod === 'cod' && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-800 dark:text-emerald-200">
                <p className="font-bold mb-0.5">سياسة الدفع عند الاستلام بالدينار العراقي:</p>
                <p>
                  يمكنك معاينة المنتج وفحص سلامة التغليف قبل تسليم المبلغ نقداً لمندوب التوصيل مع استلام وصل الضمان الرسمي من محل سعد.
                </p>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">الإجمالي المستحق للدفع:</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {totalAmount.toLocaleString()} <span className="text-base text-blue-600 dark:text-cyan-400 font-bold">د.ع</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <span>جاري تأكيد وتأمين الطلب...</span>
                ) : (
                  <>
                    <span>تأكيد الطلب النهائي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
