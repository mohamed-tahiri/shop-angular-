// state/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.model';
import { addItem, removeItem, updateQuantity, clearCart, hydrateCart, applyCoupon, removeCoupon } from './cart.actions';

function loadInitialState(): CartState {
  const stored = localStorage.getItem('cart');
  return stored
    ? JSON.parse(stored)
    : { items: [], totalPrice: 0, count: 0, coupon: null, discountAmount: 0 };
}

export const initialState: CartState = loadInitialState();

export const cartReducer = createReducer(
  initialState,

  on(hydrateCart, (_, { state }) => state),

  on(addItem, (state, { item }) => {
    const existing = state.items.find(i => i.id === item.id);
    const updatedItems = existing
      ? state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      : [...state.items, item];

    const totalPrice = updatedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const count = updatedItems.reduce((acc, it) => acc + it.quantity, 0);
    const discountAmount = state.coupon ? totalPrice * (state.coupon.discountPercent / 100) : 0;

    return { ...state, items: updatedItems, count, totalPrice, discountAmount };
  }),

  on(removeItem, (state, { productId }) => {
    const updatedItems = state.items.filter(i => i.id !== productId);
    const totalPrice = updatedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const count = updatedItems.reduce((acc, it) => acc + it.quantity, 0);
    const discountAmount = state.coupon ? totalPrice * (state.coupon.discountPercent / 100) : 0;
    return { ...state, items: updatedItems, totalPrice, count, discountAmount };
  }),

  on(updateQuantity, (state, { productId, quantity }) => {
    const updatedItems = state.items.map(i =>
      i.id === productId ? { ...i, quantity } : i
    );
    const totalPrice = updatedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const count = updatedItems.reduce((acc, it) => acc + it.quantity, 0);
    const discountAmount = state.coupon ? totalPrice * (state.coupon.discountPercent / 100) : 0;
    return { ...state, items: updatedItems, totalPrice, count, discountAmount };
  }),

  on(clearCart, () => ({ items: [], count: 0, totalPrice: 0, coupon: null, discountAmount: 0 })),

  on(applyCoupon, (state, { coupon }) => ({
    ...state,
    coupon,
    discountAmount: state.totalPrice * (coupon.discountPercent / 100)
  })),

  on(removeCoupon, (state) => ({
    ...state,
    coupon: null,
    discountAmount: 0
  }))
);
