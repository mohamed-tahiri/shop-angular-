import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, take } from 'rxjs';
import { selectIsLoggedIn } from '../../state/auth/auth.selectors';
import { selectCartItems } from '../../state/cart/cart.selectors';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.select(selectIsLoggedIn),
      this.store.select(selectCartItems)
    ]).pipe(
      take(1), // on prend juste la valeur actuelle
      map(([isLoggedIn, cartItems]) => {
        if (!isLoggedIn) {
          // Si non connecté → redirection vers login
          this.router.navigate(['/login']);
          return false;
        }

        if (!cartItems || cartItems.length === 0) {
          // Si le panier est vide → redirection vers la page produits
          this.router.navigate(['/shop/products']);
          return false;
        }

        // Si connecté et panier non vide → accès autorisé
        return true;
      })
    );
  }
}
