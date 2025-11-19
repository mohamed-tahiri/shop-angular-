// state/wishlist/wishlist.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { WishlistState } from './wishlist.model';
import { addToWishlist, removeFromWishlist, clearWishlist, hydrateWishlist } from './wishlist.actions';

function loadInitialState(): WishlistState {
  const stored = localStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : { items: [] };
}

export const initialState: WishlistState = loadInitialState();

export const wishlistReducer = createReducer(
  initialState,

  on(hydrateWishlist, (_, { state }) => state),

  on(addToWishlist, (state, { product }) => {
    const exists = state.items.find(i => i.id === product.id);
    if (exists) return state; // avoid duplicates
    return {
      ...state,
      items: [...state.items, product]
    };
  }),

  on(removeFromWishlist, (state, { productId }) => ({
    ...state,
    items: state.items.filter(i => i.id !== productId)
  })),

  on(clearWishlist, () => ({ items: [] }))
);
