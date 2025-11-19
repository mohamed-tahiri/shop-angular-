import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectIsLoggedIn } from '../../state/auth/auth.selectors';
import { selectCartCount } from '../../state/cart/cart.selectors';
import { logout } from '../../state/auth/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  cartCount$: Observable<number>;

  constructor(private store: Store, private router: Router) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.cartCount$ = this.store.select(selectCartCount);
  }

  goHome() { this.router.navigate(['/']); }
  goToProducts() { this.router.navigate(['/app/shop/products']); }
  onLogin() { this.router.navigate(['/app/login']); }
  onLogout() { this.store.dispatch(logout()); }
  goToCart() { this.router.navigate(['/app/shop/cart']); }
  goToRatings() { this.router.navigate(['/app/shop/products/rating'])}


  goToWishlist() { this.router.navigate(['/app/shop/wishlist']); }
}
