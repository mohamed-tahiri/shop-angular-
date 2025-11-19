// state/wishlist/wishlist.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.model';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistItems = createSelector(
  selectWishlistState,
  state => state.items
);

export const selectWishlistCount = createSelector(
  selectWishlistState,
  state => state.items.length
);
