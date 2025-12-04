// store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User, OrderSummary } from '../../../mocks/user';

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const updateUser = createAction('[User] Update User',props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success',props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update User Failure',props<{ error: any }>());

export const loadOrders = createAction('[User] Load Orders');
export const loadOrdersSuccess = createAction('[User] Load Orders Success', props<{ orders: OrderSummary[] }>());
export const loadOrdersFailure = createAction('[User] Load Orders Failure', props<{ error: any }>());

export const loadOrderDetail = createAction('[User] Load Order Detail', props<{ id: string }>());
export const loadOrderDetailSuccess = createAction('[User] Load Order Detail Success', props<{ order: OrderSummary }>());
export const loadOrderDetailFailure = createAction('[User] Load Order Detail Failure', props<{ error: any }>());
