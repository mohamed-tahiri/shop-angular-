import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsEffects } from './products.effects';
import * as P from './products.actions';
import { ShopApiService } from '../../core/services/shop-api.service';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let api: jasmine.SpyObj<ShopApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj('ShopApiService', ['getProducts']);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ShopApiService, useValue: api }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
  });

  it('loadProducts → success', (done) => {
    api.getProducts.and.returnValue(
      of({ count: 1, results: [{ id: 1 }] })
    );

    actions$ = of(P.loadProducts({ page: 1, pageSize: 10 }));

    effects.load$.subscribe(action => {
      expect(action.type).toBe(P.loadProductsSuccess.type);
      done();
    });
  });

  it('loadProducts → failure', (done) => {
    api.getProducts.and.returnValue(
      throwError(() => 'error')
    );

    actions$ = of(P.loadProducts({ page: 1, pageSize: 10 }));

    effects.load$.subscribe(action => {
      expect(action.type).toBe(P.loadProductsFailure.type);
      done();
    });
  });

});
