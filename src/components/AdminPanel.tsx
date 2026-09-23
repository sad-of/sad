import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Check, 
  X,
  Sparkles,
  BarChart3,
  Search,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetCatalog,
    orders,
    updateOrderStatus,
    messages,
    markMessageRead,
    setActiveSection
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'orders' | 'messages'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchAdmin, setSearchAdmin] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'consoles' as ProductCategory,
    price: '',
    originalPrice: '',
    stock: '15',
    image: '/src/assets/images/product_ps5_console_1790179807768.jpg',
    tag: 'عتاد جديد',
    shortSpecs: 'معمارية بلايستيشن 5 برو، وسيط تخزين فائق السرعة، دعم ردود الفعل اللمسية',
    description: 'عتاد الجيل الجديد من سوني بلايستيشن مصمم لتقديم أقصى درجات الانغماس والسرعة الفائقة.',
    featured: false
  });

  // Preset image choices for admin convenience
  const PRESET_IMAGES = [
    { label: 'جهاز كونسول PS5', url: '/src/assets/images/product_ps5_console_1790179807768.jpg' },
    { label: 'يد تحكم DualSense', url: '/src/assets/images/product_dualsense_edge_1790179819182.jpg' },
    { label: 'نظارة PS VR2', url: '/src/assets/images/product_ps_vr2_headset_1790179830489.jpg' },
    { label: 'شاشة ألعاب سوني', url: '/src/assets/images/product_oled_monitor_1790179841758.jpg' },
    { label: 'منصة ألعاب متكاملة', url: '/src/assets/images/hero_playstation_setup_1790179795410.jpg' }
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim() || !newProd.price) {
      alert('يرجى إدخال اسم المنتج وسعره على الأقل.');
      return;
    }

    const priceNum = parseFloat(newProd.price);
    const origPriceNum = newProd.originalPrice ? parseFloat(newProd.originalPrice) : undefined;
    const stockNum = parseInt(newProd.stock) || 10;

    const shortSpecsArray = newProd.shortSpecs
      .split('،')
      .join(',')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addProduct({
      name: newProd.name.trim(),
      category: newProd.category,
      price: priceNum,
      originalPrice: origPriceNum,
      stock: stockNum,
      image: newProd.image.trim() || '/src/assets/images/product_ps5_console_1790179807768.jpg',
      tag: newProd.tag.trim() || undefined,
      shortSpecs: shortSpecsArray.length > 0 ? shortSpecsArray : ['ملحق بلايستيشن أصلي معتمد'],
      description: newProd.description.trim(),
      rating: 5.0,
      reviewCount: 1,
      specs: [
        { name: 'التصنيف', value: newProd.category },
        { name: 'الضمان', value: 'ضمان رسمي معتمد سنتين' },
        { name: 'الحالة', value: 'جديد ومختوم بختم المصنع' }
      ],
      inTheBox: [newProd.name, 'دليل المستخدم والتعليمات', 'كرت الضمان الذهبي والأختام'],
      featured: newProd.featured
    });

    setSuccessNotice(`تمت إضافة المنتج "${newProd.name}" بنجاح إلى كتالوج المتجر!`);
    setTimeout(() => setSuccessNotice(''), 4000);

    // Reset form
    setNewProd({
      name: '',
      category: 'consoles',
      price: '',
      originalPrice: '',
      stock: '15',
      image: '/src/assets/images/product_ps5_console_1790179807768.jpg',
      tag: 'عتاد جديد',
      shortSpecs: 'معمارية بلايستيشن 5 برو، وسيط تخزين فائق السرعة، دعم ردود الفعل اللمسية',
      description: 'عتاد الجيل الجديد من سوني بلايستيشن مصمم لتقديم أقصى درجات الانغماس والسرعة الفائقة.',
      featured: false
    });

    setActiveTab('products');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct);
    setSuccessNotice(`تم تحديث بيانات "${editingProduct.name}" بنجاح!`);
    setTimeout(() => setSuccessNotice(''), 3000);
    setEditingProduct(null);
  };

  // Filter products for admin table
  const filteredAdminProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
    p.category.toLowerCase().includes(searchAdmin.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const getCategoryArabicName = (cat: ProductCategory) => {
    switch (cat) {
      case 'consoles': return 'أجهزة الكونسول';
      case 'controllers': return 'وحدات التحكم';
      case 'vr': return 'واقع افتراضي VR2';
      case 'displays': return 'شاشات الألعاب';
      case 'audio': return 'السماعات والصوتيات';
      case 'games': return 'الألعاب';
      case 'accessories': return 'الملحقات والتخزين';
      default: return cat;
    }
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-right">
        {/* Top Title & Quick KPI Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لوحة الإدارة والمخزون · سعد للإلكترونيات</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              إدارة المنتجات، الطلبات والمخزون
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/saad-electronics-website.zip"
              download="saad-electronics-website.zip"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              title="تحميل كود وملفات الموقع بصيغة مضغوطة ZIP"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>تحميل ملفات الموقع (ZIP)</span>
            </a>
            <button
              onClick={() => setActiveSection('store')}
              className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>العودة لواجهة المتجر</span>
            </button>
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد من استعادة كتالوج المنتجات الافتراضي الأصلي لسعد للإلكترونيات؟')) {
                  resetCatalog();
                  setSuccessNotice('تمت استعادة مخزون المتجر والمنتجات الافتراضية بنجاح.');
                  setTimeout(() => setSuccessNotice(''), 3000);
                }
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              title="استعادة المنتجات الافتراضية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة المخزون الافتراضي</span>
            </button>
          </div>
        </div>

        {/* Store KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">المنتجات في الكتالوج</span>
              <Package className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
              {products.length} <span className="text-xs font-normal text-slate-400">منتج</span>
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">إجمالي طلبات العملاء</span>
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
              {orders.length} <span className="text-xs font-normal text-slate-400">طلب</span>
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">إجمالي المبيعات</span>
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
              {totalRevenue.toLocaleString()} <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">د.ع</span>
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">رسائل وتذاكر الدعم</span>
              <MessageSquare className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
              {messages.length} <span className="text-xs font-normal text-slate-400">رسالة</span>
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs rounded-lg flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice('')} className="text-emerald-600 hover:text-emerald-800">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>مخزون المنتجات ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلبات العملاء ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>رسائل واستفسارات الدعم ({messages.length})</span>
          </button>
        </div>

        {/* Tab 1: Product Inventory Table */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchAdmin}
                  onChange={(e) => setSearchAdmin(e.target.value)}
                  placeholder="بحث في المخزون والمنتجات..."
                  className="w-full pr-9 pl-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                />
              </div>

              <button
                onClick={() => setActiveTab('add')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج جديد</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">المنتج</th>
                      <th className="py-3 px-4">القسم</th>
                      <th className="py-3 px-4">السعر</th>
                      <th className="py-3 px-4">المخزون المتوفر</th>
                      <th className="py-3 px-4">الشارة</th>
                      <th className="py-3 px-4 text-left">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAdminProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-950 rounded p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                              <img
                                src={p.image}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{p.name}</p>
                              <p className="text-[11px] text-slate-400 truncate max-w-xs">{p.shortSpecs?.join(' · ')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                          {getCategoryArabicName(p.category)}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white tabular-nums">
                          {p.price.toLocaleString()} د.ع
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold tabular-nums ${p.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                            {p.stock} قطعة
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                          {p.tag ? (
                            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[11px] font-semibold">
                              {p.tag}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="py-3 px-4 text-left">
                          <div className="flex items-center justify-start gap-2" dir="ltr">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                              title="تعديل المنتج"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من حذف المنتج "${p.name}"؟`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Add New Product Form */}
        {activeTab === 'add' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              إضافة جهاز أو ملحق بلايستيشن جديد إلى المتجر
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="مثال: جهاز سوني بلايستيشن 5 برو إصدار الذكرى الثلاثين"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    قسم المنتج *
                  </label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  >
                    <option value="consoles">أجهزة الكونسول والأنظمة</option>
                    <option value="controllers">وحدات التحكم واليد</option>
                    <option value="vr">نظارات الواقع الافتراضي VR2</option>
                    <option value="displays">شاشات الألعاب فائقة السرعة</option>
                    <option value="audio">السماعات والصوتيات الاحترافية</option>
                    <option value="games">ألعاب بلايستيشن الحصرية</option>
                    <option value="accessories">الملحقات وتطوير التخزين</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    شارة ترويجية للمنتج (Tag)
                  </label>
                  <input
                    type="text"
                    value={newProd.tag}
                    onChange={(e) => setNewProd({ ...newProd, tag: e.target.value })}
                    placeholder="مثال: إصدار محدود، متوفر الآن، الأكثر مبيعاً"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    السعر الحالي (د.ع - دينار عراقي) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    placeholder="مثال: 1150000"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    السعر الأصلي قبل الخصم (اختياري - د.ع)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    placeholder="مثال: 1250000"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الكمية المتوفرة في المخزن
                  </label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                    placeholder="15"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProd.featured}
                      onChange={(e) => setNewProd({ ...newProd, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300"
                    />
                    <span>إبراز المنتج كمنتج مميز في الصفحة الرئيسية</span>
                  </label>
                </div>

                {/* Image Selection with Presets */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    صورة المنتج (اختر من النماذج الجاهزة أو ضع رابطاً)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setNewProd({ ...newProd, image: preset.url })}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                          newProd.image === preset.url
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    placeholder="رابط أو مسار الصورة..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-left"
                    dir="ltr"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    أهم الميزات والمواصفات السريعة (مفصولة بفاصلة)
                  </label>
                  <input
                    type="text"
                    value={newProd.shortSpecs}
                    onChange={(e) => setNewProd({ ...newProd, shortSpecs: e.target.value })}
                    placeholder="مثال: سعة 2 تيرابايت، دقة 4K بمعدل 120 إطار، تتبع الأشعة المطور، واي فاي 7"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    وصف المنتج التفصيلي
                  </label>
                  <textarea
                    rows={3}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    placeholder="اكتب وصفاً جذاباً وشاملاً للمنتج ومواصفاته..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>نشر وحفظ المنتج في المتجر</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white">
                سجل طلبات العملاء المباشرة ({orders.length})
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.length === 0 ? (
                  <p className="p-8 text-center text-xs text-slate-400">لا توجد طلبات مسجلة حتى الآن.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-4 sm:p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            طلب رقم #{order.id}
                          </span>
                          <span className="text-xs text-slate-400">· {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">حالة الطلب:</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="py-1 px-2.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          >
                            <option value="Processing">قيد المعالجة والتجهيز</option>
                            <option value="Shipped">تم الشحن والتسليم لشركة النقل</option>
                            <option value="Delivered">تم التوصيل بنجاح</option>
                            <option value="Cancelled">ملغي</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer info & Address */}
                      <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg">
                        <div>
                          <p><span className="font-bold text-slate-700 dark:text-slate-200">العميل:</span> {order.customer.fullName}</p>
                          <p><span className="font-bold text-slate-700 dark:text-slate-200">التواصل:</span> <span dir="ltr">{order.customer.phone}</span> | {order.customer.email}</p>
                        </div>
                        <div>
                          <p><span className="font-bold text-slate-700 dark:text-slate-200">عنوان التوصيل:</span> {order.customer.address}، {order.customer.city}</p>
                          <p><span className="font-bold text-slate-700 dark:text-slate-200">طريقة الدفع:</span> {order.customer.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : order.customer.paymentMethod === 'card' ? 'بطاقة بنكية / مدى' : 'محفظة بلايستيشن الرقمية'}</p>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                        <div className="text-slate-500 space-x-2">
                          {order.items.map((it, idx) => (
                            <span key={idx} className="font-semibold text-slate-700 dark:text-slate-300 ms-2">
                              {it.quantity}x {it.product.name}
                            </span>
                          ))}
                        </div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                          الإجمالي: {order.total.toLocaleString()} د.ع
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Messages / Inquiries */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white">
                رسائل وتذاكر العملاء ({messages.length})
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {messages.length === 0 ? (
                  <p className="p-8 text-center text-xs text-slate-400">لا توجد رسائل دعم جديدة حتى الآن.</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="p-4 sm:p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{m.name}</span>
                          <span className="text-xs text-slate-400">({m.email})</span>
                          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">· {m.subject}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums">{m.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg leading-relaxed">
                        {m.message}
                      </p>
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => markMessageRead(m.id)}
                          className={`text-xs px-2.5 py-1 rounded transition-colors ${
                            m.status === 'Read' 
                              ? 'text-slate-400' 
                              : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                          }`}
                        >
                          {m.status === 'Read' ? 'تمت القراءة' : 'تحديد كمقروء'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 text-right" dir="rtl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  تعديل بيانات المنتج
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      السعر (د.ع - دينار عراقي)
                    </label>
                    <input
                      type="number"
                      step="1000"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      كمية المخزون
                    </label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    شارة المنتج (Tag)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.tag || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الوصف
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-right"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
