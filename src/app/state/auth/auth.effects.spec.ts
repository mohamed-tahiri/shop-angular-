import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../core/services/shop-api.service';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let api: jasmine.SpyObj<ShopApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj('ShopApiService', ['login']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: ShopApiService, useValue: api },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('login → success', (done) => {
    api.login.and.returnValue(of({ access: 'token', refresh: 'refresh' }));

    actions$ = of(AuthActions.login({ username: 'a', password: 'b' }));

    effects.login$.subscribe(action => {
      expect(action.type).toBe(AuthActions.loginSuccess.type);
      done();
    });
  });

  it('login → failure', (done) => {
    api.login.and.returnValue(throwError(() => 'error'));

    actions$ = of(AuthActions.login({ username: 'a', password: 'b' }));

    effects.login$.subscribe(action => {
      expect(action.type).toBe(AuthActions.loginFailure.type);
      done();
    });
  });

});
