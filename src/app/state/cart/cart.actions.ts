// state/cart/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { CartItem, CartState, Coupon } from './cart.model';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const hydrateCart = createAction(
  '[Cart] Hydrate Cart',
  props<{ state: CartState }>()
);

export const applyCoupon = createAction(
  '[Cart] Apply Coupon',
  props<{ coupon: Coupon }>()
);

export const removeCoupon = createAction('[Cart] Remove Coupon');
