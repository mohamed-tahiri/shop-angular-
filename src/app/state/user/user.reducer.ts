// store/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User, OrderSummary } from '../../../mocks/user';

export interface UserState {
  user: User | null;
  selectedOrder: OrderSummary | null;
  orders: OrderSummary[];
  loading: boolean;
  error: any | null;
}

export const initialUserState: UserState = {
  user: null,
  selectedOrder: null,
  orders: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.updateUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.loadOrders, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, orders, loading: false })),
  on(UserActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.loadOrderDetail, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loadOrderDetailSuccess, (state, { order }) => ({ ...state, selectedOrder: order, loading: false })),
  on(UserActions.loadOrderDetailFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
