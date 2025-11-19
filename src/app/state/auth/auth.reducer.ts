import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { access, refresh }) => ({ ...state, access, refresh, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.refreshSuccess, (state, { access }) => ({ ...state, access })),
  on(AuthActions.refreshFailure, (state, { error }) => ({ ...state, access: null, refresh: null, error })),
  on(AuthActions.logout, state => ({ ...state, access: null, refresh: null })) // ← logout géré ici
);
