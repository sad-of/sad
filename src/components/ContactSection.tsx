import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { submitContactMessage } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'متابعة وتتبع طلب',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    submitContactMessage(formData.name, formData.email, formData.subject, formData.message);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: 'متابعة وتتبع طلب',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const PHYSICAL_STORES = [
    {
      city: 'بغداد - الفرع الرئيسي (الكرادة)',
      address: 'بغداد، الكرادة، شارع العرصات، قرب ساحة المسبح، العراق',
      phone: '07722337379',
      hours: 'السبت – الخميس: 9:30 ص – 11:30 م | الجمعة: 4:00 م – 12:00 منتصف الليل',
      tag: 'صالة تجربة أجهزة PS5 وشاشات الألعاب'
    },
    {
      city: 'بغداد - فرع المنصور',
      address: 'بغداد، المنصور، شارع 14 رمضان، مقابل مول المنصور، العراق',
      phone: '07722337379',
      hours: 'السبت – الخميس: 10:00 ص – 12:00 منتصف الليل | الجمعة: 4:00 م – 12:30 ليلاً',
      tag: 'مركز صيانة وتطوير كونسول فوري'
    },
    {
      city: 'البصرة - فرع العشار',
      address: 'البصرة، العشار، شارع الكويت التجاري، العراق',
      phone: '07722337379',
      hours: 'السبت – الخميس: 9:30 ص – 11:00 م | الجمعة: 4:30 م – 11:30 م',
      tag: 'منصة ألعاب ونظارات VR2'
    }
  ];

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 transition-colors" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-right">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            فريق خدمة العملاء ومراكز الخبرة
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            تواصل مع خبراء سعد للإلكترونيات
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            هل لديك أي استفسار حول توافق أجهزة PS5 Pro، تتبع الشحنات، أو الطلبات الخاصة؟ تواصل معنا مباشرة أو تفضل بزيارة معارضنا.
          </p>
        </div>

        {/* Contact Form & Direct Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>إرسال استفسار أو طلب دعم</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              يتم استقبال ومتابعة جميع الرسائل فوراً من قبل فريق الدعم الفني خلال أقل من ساعتي عمل.
            </p>

            {isSubmitted ? (
              <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-base">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-xs max-w-md mx-auto">
                  شكراً لتواصلك مع سعد للإلكترونيات. تم تسجيل طلبك وسيقوم أحد أخصائيي الأجهزة بالتواصل معك عبر البريد أو الجوال سريعاً.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: فيصل العتيبي"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      البريد الإلكتروني للرد *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    تصنيف الاستفسار *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  >
                    <option value="متابعة وتتبع طلب">متابعة وتتبع حالة شحنة وطلب</option>
                    <option value="استفسار فني ومواصفات">استفسار عن عتاد بلايستيشن والتوافق</option>
                    <option value="الضمان والصيانة">خدمات الضمان الذهبي والاستبدال</option>
                    <option value="طلبات الجملة والصالات">تجهيز صالات ألعاب وبطولات إلكترونية</option>
                    <option value="اقتراح أو ملاحظة عامة">ملاحظات واقتراحات عامة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل الرسالة أو رقم الطلب *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب استفسارك بالتفصيل وسنسعد بخدمتك في أسرع وقت..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الرسالة الآن</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Hotline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                قنوات الاتصال المباشرة
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">رقم الهاتف وخدمة العملاء المباشرة</p>
                    <p className="text-slate-900 dark:text-cyan-300 font-bold mt-0.5" dir="ltr">07722337379</p>
                    <p className="text-[11px] text-slate-400">السبت – الخميس: 9:00 صباحاً – 11:30 مساءً</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">واتساب الطلبات والاستفسارات السريعة</p>
                    <p className="text-slate-900 dark:text-emerald-300 font-bold mt-0.5" dir="ltr">07722337379</p>
                    <p className="text-[11px] text-slate-400">استجابة فورية وتحديثات شحن الأجهزة في العراق</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">البريد الإلكتروني المعتمد</p>
                    <p className="text-slate-600 dark:text-slate-300 font-medium mt-0.5" dir="ltr">support@saad-electronics.iq</p>
                    <p className="text-[11px] text-slate-400">تتبع الطلبات ومطالبات الضمان الرسمي</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Express Dispatch Promise */}
            <div className="bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 p-6 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>وعد التوصيل السريع والشحن في نفس اليوم</span>
              </div>
              <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
                جميع طلبات أجهزة بلايستيشن 5 والشاشات المؤكدة قبل الساعة 4:00 عصراً يتم شحنها في نفس اليوم مع تغليف حماية فائق وشركات شحن سريعة ومؤمنة بالكامل.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Showrooms List */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              صالات العرض ومعارضنا المعتمدة
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              تفضل بزيارة فروع ومراكز تجربة سعد للإلكترونيات
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHYSICAL_STORES.map((store, i) => (
              <div key={i} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{store.city}</span>
                  </h4>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                    {store.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {store.address}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">الهاتف:</span> <span dir="ltr">{store.phone}</span></p>
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">ساعات العمل:</span> {store.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
