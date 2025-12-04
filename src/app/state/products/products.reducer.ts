import { createReducer, on } from '@ngrx/store';
import * as P from './products.actions';
import { Review } from '../../../mocks/data';

export interface ProductsState {
  list: any[];
  count: number;
  loading: boolean;
  error: any | null;
  lastQuery: any;
  ratings: { [id: number]: { avg_rating: number; count: number } };
  reviews: { [id: number]: Review[] };
}

export const initialProducts: ProductsState = {
  list: [],
  count: 0,
  loading: false,
  error: null,
  lastQuery: null,
  ratings: {},
  reviews: {}
};

export const productsReducer = createReducer(
  initialProducts,
  
  // Load products
  on(P.loadProducts, (state, query) => ({ ...state, loading: true, error: null, lastQuery: query })),
  on(P.loadProductsSuccess, (state, { count, results }) => ({ ...state, loading: false, list: results, count })),
  on(P.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Load rating
  on(P.loadRatingSuccess, (state, { id, avg_rating, count }) => ({
    ...state,
    ratings: { ...state.ratings, [id]: { avg_rating, count } }
  })),

  // Load reviews
  on(P.loadReviews, state => ({ ...state, loading: true, error: null })),
  on(P.loadReviewsSuccess, (state, { productId, reviews }) => ({
    ...state,
    loading: false,
    reviews: { ...state.reviews, [productId]: reviews }
  })),
  on(P.loadReviewsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Post review
  on(P.postReviewSuccess, (state, { productId, review }) => ({
    ...state,
    reviews: {
      ...state.reviews,
      [productId]: [...(state.reviews[productId] || []), review]
    }
  })),
  on(P.postReviewFailure, (state, { error }) => ({ ...state, error }))
);
