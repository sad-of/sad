export type ProductCategory = 
  | 'consoles'
  | 'controllers'
  | 'vr'
  | 'audio'
  | 'displays'
  | 'games'
  | 'accessories';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  gallery?: string[];
  tag?: string; // Subtle text tag e.g. "Flagship", "Hot Release", "Low Stock"
  shortSpecs: string[];
  description: string;
  specs: ProductSpec[];
  inTheBox: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cod' | 'ps_wallet';
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending COD Verification' | 'Awaiting Payment';
}

export interface ContactMessage {
  id: string;
  date: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Resolved';
}
