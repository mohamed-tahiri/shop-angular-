// store/user/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, state => state.user);
export const selectOrders = createSelector(selectUserState, state => state.orders);
export const selectSelectedOrder = createSelector(selectUserState, state => state.selectedOrder);
export const selectUserLoading = createSelector(selectUserState, state => state.loading);
export const selectUserError = createSelector(selectUserState, state => state.error);
