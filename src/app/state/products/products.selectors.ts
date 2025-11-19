import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectProductsList = createSelector(selectProductsState, s => s.list);
export const selectProductsCount = createSelector(selectProductsState, s => s.count);
export const selectProductsLoading = createSelector(selectProductsState, s => s.loading);
export const selectProductsError = createSelector(selectProductsState, s => s.error);
export const selectProductRating = (id: number) => createSelector(selectProductsState, s => s.ratings[id] || null);
export const selectProduct = (id: number) => createSelector(selectProductsState, (state) =>state.list.find((product) => product.id === id));