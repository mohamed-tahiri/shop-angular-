export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderSummary {
  id: string;
  date: string; // ISO
  status: 'en_cours' | 'expédiée' | 'livrée';
  items: OrderItem[];
  subTotal: number;
  tax: number;
  shippingFee: number;
  total: number;
}

export interface UserPreferences {
  newsletter: boolean;
  defaultMinRating?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  defaultAddress?: Address;
  preferences: UserPreferences;
  orders: OrderSummary[];
}