// state/cart/cart.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon } from './cart.actions';
import { selectCartState } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  saveCartToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon),
        withLatestFrom(this.store.select(selectCartState)),
        tap(([_, cart]) => {
          localStorage.setItem('cart', JSON.stringify(cart));
        })
      ),
    { dispatch: false }
  );
}
