import { createAction, props } from '@ngrx/store';
import { Product } from '../../../mocks/data';

// --- Liste produits existante ---
export const loadProducts = createAction('[Products] Load', props<{ page?: number; pageSize?: number; minRating?: number; ordering?: string }>());
export const loadProductsSuccess = createAction('[Products] Load Success', props<{ count: number; results: any[]; query: any }>());
export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: any }>());

// --- Load rating existant ---
export const loadRating = createAction('[Products] Load Rating', props<{ id: number }>());
export const loadRatingSuccess = createAction('[Products] Load Rating Success', props<{ id: number; avg_rating: number; count: number }>());
export const loadRatingFailure = createAction('[Products] Load Rating Failure', props<{ error: any }>());

// --- load single product by ID ---
export const loadProduct = createAction('[Products] Load Product',props<{ id: number }>());
export const loadProductSuccess = createAction('[Products] Load Product Success',props<{ product: Product }>());
export const loadProductFailure = createAction('[Products] Load Product Failure',props<{ error: any }>());