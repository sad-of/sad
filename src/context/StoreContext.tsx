import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ContactMessage, CustomerDetails } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  theme: 'dark' | 'light';
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  messages: ContactMessage[];
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isAdminOpen: boolean;
  activeSection: 'store' | 'about' | 'contact' | 'admin';
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setActiveSection: (section: 'store' | 'about' | 'contact' | 'admin') => void;
  toggleTheme: () => void;
  
  // Cart & Wishlist
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Admin Product Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetCatalog: () => void;
  
  // Orders & Inquiries
  placeOrder: (customer: CustomerDetails, discountApplied?: number) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  submitContactMessage: (name: string, email: string, subject: string, message: string) => void;
  markMessageRead: (messageId: string) => void;
  
  // Cart totals
  cartSubtotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'SAAD-10941',
    date: '2026-09-22 14:32',
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[1], quantity: 1 }
    ],
    customer: {
      fullName: 'علي الكرخي',
      email: 'ali.karkhi@example.com',
      phone: '07722337379',
      address: 'بغداد - الكرادة، شارع العرصات',
      city: 'بغداد',
      postalCode: '10001',
      paymentMethod: 'card'
    },
    subtotal: 1255000,
    discount: 50000,
    shipping: 0,
    total: 1205000,
    status: 'Shipped',
    paymentStatus: 'Paid'
  },
  {
    id: 'SAAD-10938',
    date: '2026-09-21 09:15',
    items: [
      { product: INITIAL_PRODUCTS[4], quantity: 1 }
    ],
    customer: {
      fullName: 'أحمد البصري',
      email: 'ahmed.basra@example.com',
      phone: '07801234567',
      address: 'البصرة - منطقة الجزائر، قرب ساحة الطيران',
      city: 'البصرة',
      postalCode: '61001',
      paymentMethod: 'cod'
    },
    subtotal: 695000,
    discount: 0,
    shipping: 0,
    total: 695000,
    status: 'Processing',
    paymentStatus: 'Pending COD Verification'
  }
];

const SAMPLE_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-101',
    date: '2026-09-23 08:20',
    name: 'حيدر الجبوري',
    email: 'haider.j@gaming-zone.iq',
    subject: 'طلب تجهيز صالة بلي ستيشن كاملة',
    message: 'السلام عليكم ورحمة الله، نحن نعرف محل سعد للبلي والإلكترونيات منذ التسعينات وسمعتكم طيبة وأسعاركم الأنسب دائماً. نود الاستفسار عن إمكانية توريد 8 أجهزة بلايستيشن 5 برو مع شاشات سوني إنزون لصالة ألعاب جديدة في المنصور.',
    status: 'Unread'
  },
  {
    id: 'msg-100',
    date: '2026-09-22 18:44',
    name: 'زينب الموسوي',
    email: 'zainab.almusawi@gmail.com',
    subject: 'استفسار عن توصيل المحافظات والضمان',
    message: 'مرحباً كادر متجر سعد للإلكترونيات، هل التوصيل إلى النجف وكربلاء متاح والدفع عند الاستلام بالدينار العراقي؟ وهل الضمان معتمد ومختوم؟ شكراً لتعاملكم الراقي.',
    status: 'Read'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: dark mode as default for sleek gaming aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('saad_theme_v3');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('saad_theme_v3', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Products state (using new key for Iraqi Dinars)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('saad_products_iqd_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('saad_products_iqd_v3', JSON.stringify(products));
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('saad_cart_iqd_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('saad_cart_iqd_v3', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('saad_wishlist_iqd_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('saad_wishlist_iqd_v3', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('saad_orders_iqd_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return SAMPLE_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('saad_orders_iqd_v3', JSON.stringify(orders));
  }, [orders]);

  // Inquiries state
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('saad_messages_iqd_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
    return SAMPLE_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('saad_messages_iqd_v3', JSON.stringify(messages));
  }, [messages]);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'store' | 'about' | 'contact' | 'admin'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Cart helper functions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: Math.min(newQty, item.product.stock) } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist helper functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Admin Product Operations
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now().toString(36)}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    // Also update in cart if present
    setCart(prev =>
      prev.map(item => (item.product.id === updated.id ? { ...item, product: updated } : item))
    );
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCart(prev => prev.filter(item => item.product.id !== productId));
    setWishlist(prev => prev.filter(id => id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('saad_products_iqd_v3');
  };

  // Orders
  const placeOrder = (customer: CustomerDetails, discountApplied = 0): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= 100000 ? 0 : 5000;
    const total = Math.max(0, subtotal - discountApplied + shipping);
    
    const newOrder: Order = {
      id: `SAAD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      items: [...cart],
      customer,
      subtotal: Math.round(subtotal),
      discount: Math.round(discountApplied),
      shipping,
      total: Math.round(total),
      status: 'Processing',
      paymentStatus: customer.paymentMethod === 'cod' ? 'Pending COD Verification' : 'Paid'
    };

    // Deduct stock
    setProducts(prev =>
      prev.map(p => {
        const bought = cart.find(item => item.product.id === p.id);
        if (bought) {
          return { ...p, stock: Math.max(0, p.stock - bought.quantity) };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Contact messages
  const submitContactMessage = (name: string, email: string, subject: string, message: string) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now().toString(36)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      name,
      email,
      subject,
      message,
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const markMessageRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, status: 'Read' } : m))
    );
  };

  // Calculated totals
  const cartSubtotal = Number(
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        theme,
        cart,
        wishlist,
        orders,
        messages,
        selectedProduct,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isAdminOpen,
        activeSection,
        searchQuery,
        selectedCategory,
        sortBy,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        setSelectedProduct,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsAdminOpen,
        setActiveSection,
        toggleTheme,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        placeOrder,
        updateOrderStatus,
        submitContactMessage,
        markMessageRead,
        cartSubtotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
