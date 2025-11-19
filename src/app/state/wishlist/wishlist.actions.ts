// state/wishlist/wishlist.actions.ts
import { createAction, props } from '@ngrx/store';
import { WishlistState } from './wishlist.model';
import { Product } from '../../../mocks/data';

export const addToWishlist = createAction(
  '[Wishlist] Add Item',
  props<{ product: Product }>()
);

export const removeFromWishlist = createAction(
  '[Wishlist] Remove Item',
  props<{ productId: number }>()
);

export const clearWishlist = createAction('[Wishlist] Clear Wishlist');

export const hydrateWishlist = createAction(
  '[Wishlist] Hydrate',
  props<{ state: WishlistState }>()
);
