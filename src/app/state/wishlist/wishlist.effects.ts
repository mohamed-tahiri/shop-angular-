// state/wishlist/wishlist.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addToWishlist, removeFromWishlist, clearWishlist } from './wishlist.actions';
import { selectWishlistState } from './wishlist.selectors';

@Injectable()
export class WishlistEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  saveWishlist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToWishlist, removeFromWishlist, clearWishlist),
        withLatestFrom(this.store.select(selectWishlistState)),
        tap(([_, wishlist]) => localStorage.setItem('wishlist', JSON.stringify(wishlist)))
      ),
    { dispatch: false }
  );
}
