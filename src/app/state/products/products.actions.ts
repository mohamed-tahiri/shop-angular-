import { createAction, props } from '@ngrx/store';
import { Product, Review } from '../../../mocks/data';

// --- Load products ---
export const loadProducts = createAction(
  '[Products] Load',
  props<{ page?: number; pageSize?: number; minRating?: number; ordering?: string }>()
);
export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ count: number; results: any[]; query: any }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Failure',
  props<{ error: any }>()
);

// --- Load rating ---
export const loadRating = createAction('[Products] Load Rating', props<{ id: number }>());
export const loadRatingSuccess = createAction(
  '[Products] Load Rating Success',
  props<{ id: number; avg_rating: number; count: number }>()
);
export const loadRatingFailure = createAction('[Products] Load Rating Failure', props<{ error: any }>());

// --- Load reviews ---
export const loadReviews = createAction('[Products] Load Reviews', props<{ productId: number }>());
export const loadReviewsSuccess = createAction(
  '[Products] Load Reviews Success',
  props<{ productId: number; reviews: Review[] }>()
);
export const loadReviewsFailure = createAction('[Products] Load Reviews Failure', props<{ error: any }>());

// --- Post review ---
export const postReview = createAction('[Products] Post Review', props<{ productId: number; review: Review }>());
export const postReviewSuccess = createAction('[Products] Post Review Success', props<{ productId: number; review: Review }>());
export const postReviewFailure = createAction('[Products] Post Review Failure', props<{ error: any }>());

// --- Load single product by ID ---
export const loadProduct = createAction('[Products] Load Product', props<{ id: number }>());
export const loadProductSuccess = createAction('[Products] Load Product Success', props<{ product: Product }>());
export const loadProductFailure = createAction('[Products] Load Product Failure', props<{ error: any }>());
