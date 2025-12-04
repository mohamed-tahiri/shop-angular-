// state/cart/cart.model.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  created_at: string;
  imageUrl: string;
  quantity: number;
  stock?: number;             // quantité disponible
  lowStockThreshold?: number; // seuil "stock faible"
}

export interface Coupon {
  code: string;
  discountPercent: number; // 10 = 10%
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  count: number;
  coupon?: Coupon | null;
  discountAmount: number; // montant réduit par coupon
}
