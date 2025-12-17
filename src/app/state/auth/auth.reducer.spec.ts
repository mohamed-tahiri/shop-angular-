import { authReducer, initialAuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('AuthReducer', () => {

  it('login → active loading et reset error', () => {
    const action = AuthActions.login({ username: 'test@test.com', password: '1234' });

    const state = authReducer(initialAuthState, action);

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('loginSuccess → stocke access & refresh tokens', () => {
    const action = AuthActions.loginSuccess({
      access: 'access-token',
      refresh: 'refresh-token'
    });

    const state = authReducer(initialAuthState, action);

    expect(state.access).toBe('access-token');
    expect(state.refresh).toBe('refresh-token');
    expect(state.loading).toBeFalse();
  });

  it('loginFailure → stocke erreur et désactive loading', () => {
    const action = AuthActions.loginFailure({ error: 'Invalid credentials' });

    const state = authReducer(initialAuthState, action);

    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBeFalse();
  });

  it('refreshSuccess → met à jour access token', () => {
    const startState = {
      ...initialAuthState,
      access: 'old-token',
      refresh: 'refresh-token'
    };

    const action = AuthActions.refreshSuccess({ access: 'new-token' });

    const state = authReducer(startState, action);

    expect(state.access).toBe('new-token');
  });

  it('refreshFailure → reset tokens et stocke erreur', () => {
    const startState = {
      ...initialAuthState,
      access: 'token',
      refresh: 'refresh'
    };

    const action = AuthActions.refreshFailure({ error: 'expired' });

    const state = authReducer(startState, action);

    expect(state.access).toBeNull();
    expect(state.refresh).toBeNull();
    expect(state.error).toBe('expired');
  });

  it('logout → supprime access et refresh', () => {
    const startState = {
      ...initialAuthState,
      access: 'token',
      refresh: 'refresh'
    };

    const action = AuthActions.logout();

    const state = authReducer(startState, action);

    expect(state.access).toBeNull();
    expect(state.refresh).toBeNull();
  });

});
