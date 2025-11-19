// state/cart/cart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartCount = createSelector(
  selectCartState,
  state => state.count
);

export const selectCartTotal = createSelector(
  selectCartState,
  state => state.totalPrice
);

export const selectCartCoupon = createSelector(
  selectCartState,
  state => state.coupon
);

export const selectCartDiscount = createSelector(
  selectCartState,
  state => state.discountAmount
);
