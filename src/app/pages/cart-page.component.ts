import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../state/cart/cart.selectors';
import { updateQuantity, removeItem, clearCart } from '../state/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../components/card/cart-item.component';
import { CartSummaryComponent } from '../components/card/cart-summary.component';
import { CartItem } from '../state/cart/cart.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent, CartSummaryComponent],
  template: `
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-8">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>

      <div *ngIf="cartItems$ | async as items; else emptyCart">
        <app-cart-item *ngFor="let item of items"
          [item]="item"
          (qtyChange)="updateQty($event)"
          (remove)="remove($event)">
        </app-cart-item>

        <app-cart-summary 
          [total]="(cartTotal$ | async) || 0"
          (clear)="clear()"
          (checkout)="checkout()">
        </app-cart-summary>
      </div>

      <ng-template #emptyCart>
        <p>Your cart is empty.</p>
      </ng-template>
    </div>
  </div>
  `
})
export class CartPageComponent {
  private store = inject(Store);
  private router = inject(Router); // ✅ inject Router pour navigation

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);

  updateQty(event: { id: number; quantity: number }) {
    const quantity = typeof event.quantity === 'string' ? parseInt(event.quantity, 10) : event.quantity;
    if (quantity > 0) {
      this.store.dispatch(updateQuantity({ productId: event.id, quantity }));
    }
  }

  remove(id: number) {
    this.store.dispatch(removeItem({ productId: id }));
  }

  clear() {
    this.store.dispatch(clearCart());
  }

  checkout() {
    // Redirige vers l'étape 1 du checkout
    this.router.navigate(['/app/shop/checkout/summary']);
  }
}
