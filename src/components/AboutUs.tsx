import React from 'react';
import { ShieldCheck, Award, Cpu, Users, Star } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 transition-colors" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-right">
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              تاريخنا العريق منذ عام 1996
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight text-balance">
              سعد للإلكترونيات: محل بلي وإلكترونيات تأسس منذ 1996 وتعامُل وأسعار مناسبة
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              انطلق <strong className="text-slate-900 dark:text-white">محل سعد للإلكترونيات والبلي</strong> منذ عام <strong className="text-blue-600 dark:text-cyan-400">1996</strong> في العراق ليكون المحل الرائد والملاذ الموثوق لعشاق ألعاب الفيديو وكونسول بلايستيشن والأجهزة الإلكترونية الحديثة. على مدار قرابة ثلاثة عقود، كان سر استمرارنا ونجاحنا هو: <strong className="text-slate-900 dark:text-white">التعامُل الصادق والأسعار المناسبة والأجهزة الأصلية 100%</strong>.
            </p>
            <p>
              اليوم نفتخر بخدمة آلاف اللاعبين من بغداد وكافة المحافظات العراقية. نوفر أحدث أجهزة سوني بلايستيشن 5 برو الأصلية، يدات التحكم DualSense، شاشات الألعاب فائقة الدقة، ملحقات الغيمنغ وتطوير وحدات التخزين، مع كفالة حقيقية ودعم فني متواصل.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              أجهزة أصلية 100%
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              جميع أجهزة الكونسول، وحدات التحكم، والملحقات تأتي مباشرة من الموزع المعتمد لسوني في الشرق الأوسط بأختام هولوغرام أصلية.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              ضمان ذهبي سنتين
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ضمان صيانة رسمي معتمد لمدة 24 شهراً مع استبدال فوري للجهاز في حال وجود أي عيب مصنعي لضمان راحة بالك.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              فحص جودة عالي الدقة
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              فريقنا الهندسي المتخصص يختبر سرعات وحدات التخزين SSD ومعدلات التبريد واستجابة الأزرار لتقديم أفضل تجربة لعب خالية من التأخير.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              دعم فني واستشاري 24/7
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              فريق من الخبراء ومحترفي الألعاب متواجدون على مدار الساعة عبر الواتساب والمحادثة المباشرة لمساعدتك في الإعداد واختيار الأنسب لك.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                آراء وتقييمات عملائنا الكرام
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ثقة أكثر من 25,000 لاعب في المملكة والخليج
              </h3>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              متوسط التقييم العام: <span className="font-bold text-slate-900 dark:text-white">4.9 من 5.0</span> من واقع مشترين حقيقيين
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400" dir="ltr">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "وصلني جهاز PS5 Pro في نفس يوم الطلب بالرياض مع تغليف حماية متين وكرت الضمان الرسمي. الأداء أسطوري على شاشة الـ OLED مع ثبات 120 إطار."
              </p>
              <div className="text-xs pt-1">
                <p className="font-bold text-slate-900 dark:text-white">عبدالعزيز الشمري</p>
                <p className="text-slate-500 text-[11px]">كابتن فريق بطولات كود · الرياض</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400" dir="ltr">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "يد التحكم DualSense Edge وسماعة PULSE Elite فارقة جداً في التنافس. الدعم الفني في سعد للإلكترونيات ساعدوني في ضبط الإعدادات خلال دقائق."
              </p>
              <div className="text-xs pt-1">
                <p className="font-bold text-slate-900 dark:text-white">سارة المهنا</p>
                <p className="text-slate-500 text-[11px]">لاعبة تيكن 8 وتحديات القتال · جدة</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400" dir="ltr">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "طلبت شاشة سوني INZONE للألعاب مع خيار الدفع عند الاستلام. وصل المندوب وفحصت الختم والكرتون قبل الدفع، مصداقية وتجربة ممتازة تستحق الإشادة."
              </p>
              <div className="text-xs pt-1">
                <p className="font-bold text-slate-900 dark:text-white">فيصل الدوسري</p>
                <p className="text-slate-500 text-[11px]">صانع محتوى ألعاب · الخبر</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
