// header.component.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { selectIsLoggedIn } from '../../../../state/auth/auth.selectors';
import { selectCartCount, selectCartItems, selectCartTotal } from '../../../../state/cart/cart.selectors';
import { selectWishlistCount } from '../../../../state/wishlist/wishlist.selectors';
import { logout } from '../../../../state/auth/auth.actions';
import { Product } from '../../../../../mocks/data';
import { selectProductsList } from '../../../../state/products/products.selectors';

// Modules Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { removeItem } from '../../../../state/cart/cart.actions';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule, 
    MatBadgeModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent {
  private store = inject(Store);
  public router = inject(Router);

  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  cartCount$: Observable<number> = this.store.select(selectCartCount);
  wishlistCount$: Observable<number> = this.store.select(selectWishlistCount);

  cartItems$ = this.store.select(selectCartItems);
  cartTotal$ = this.store.select(selectCartTotal);

  showCartPreview = false; // pour le hover

  searchQuery: string = '';
  searchResults: Product[] = [];

  // Navigation
  goHome() { this.router.navigate(['/']); }
  goToProducts() { this.router.navigate(['/shop/products']); }
  onLogin() { this.router.navigate(['/login']); }
  onLogout() { this.store.dispatch(logout()); }
  goToCart() { this.router.navigate(['/shop/cart']); }
  goToRatings() { this.router.navigate(['/shop/products/rating']); }
  goToWishlist() { this.router.navigate(['/shop/wishlist']); }
  checkout() { this.router.navigate(['/shop/checkout/summary']); }
  goToProfile() { this.router.navigate(['/account/profile']); }
  goToMyOrders() { this.router.navigate(['/account/orders']); }

  // Cart actions
  remove(productId: number) {
    this.store.dispatch(removeItem({ productId }));
  }

  // Recherche produits
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.store.select(selectProductsList)
      .pipe(
        map(products => products
          .filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
          .slice(0, 3)
        )
      )
      .subscribe(results => this.searchResults = results);
  }

  goToProduct(productId: number) {
    this.router.navigate(['/shop/products', productId]);
    this.searchResults = [];
    this.searchQuery = '';
  }
}
