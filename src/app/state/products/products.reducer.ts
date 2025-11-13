import { createReducer, on } from '@ngrx/store';
import * as P from './products.actions';

export interface ProductsState {
  list: any[];
  count: number;
  loading: boolean;
  error: any | null;
  lastQuery: any;
  ratings: { [id: number]: { avg_rating: number; count: number } };
}

export const initialProducts: ProductsState = {
  list: [],
  count: 0,
  loading: false,
  error: null,
  lastQuery: null,
  ratings: {}
};

export const productsReducer = createReducer(
  initialProducts,
  on(P.loadProducts, (state, query) => ({ ...state, loading: true, error: null, lastQuery: query })),
  on(P.loadProductsSuccess, (state, { count, results, query }) => ({ ...state, loading: false, list: results, count })),
  on(P.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(P.loadRatingSuccess, (state, { id, avg_rating, count }) => ({ ...state, ratings: { ...state.ratings, [id]: { avg_rating, count } } }))
);
