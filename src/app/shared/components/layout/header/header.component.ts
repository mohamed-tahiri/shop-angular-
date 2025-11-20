import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Nécessaire pour les champs de formulaire

// Modules Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

// NgRx Selectors & Actions (Ajustez les chemins selon votre structure)
import { selectIsLoggedIn } from '../../../../state/auth/auth.selectors';
import { selectCartCount } from '../../../../state/cart/cart.selectors';
import { logout } from '../../../../state/auth/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule, 
    MatBadgeModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatToolbarModule
  ]
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  cartCount$: Observable<number>;

  constructor(private store: Store, private router: Router) {
    // Initialisation des Observables NgRx
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.cartCount$ = this.store.select(selectCartCount);
  }

  // Méthodes de Navigation et d'Action
  goHome() { this.router.navigate(['/']); }
  goToProducts() { this.router.navigate(['/app/shop/products']); }
  onLogin() { this.router.navigate(['/app/login']); }
  onLogout() { this.store.dispatch(logout()); }
  goToCart() { this.router.navigate(['/app/shop/cart']); }
  goToRatings() { this.router.navigate(['/app/shop/products/rating'])}
  goToWishlist() { this.router.navigate(['/app/shop/wishlist']); }
  onSearch() {
    console.log('Recherche déclenchée');
  }
}