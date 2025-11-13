import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Products] Load', props<{ page?: number; pageSize?: number; minRating?: number; ordering?: string }>());
export const loadProductsSuccess = createAction('[Products] Load Success', props<{ count: number; results: any[]; query: any }>());
export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: any }>());
export const loadRating = createAction('[Products] Load Rating', props<{ id: number }>());
export const loadRatingSuccess = createAction('[Products] Load Rating Success', props<{ id: number; avg_rating: number; count: number }>());
export const loadRatingFailure = createAction('[Products] Load Rating Failure', props<{ error: any }>());
