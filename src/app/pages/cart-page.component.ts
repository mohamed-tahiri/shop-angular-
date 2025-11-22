import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../state/cart/cart.selectors';
import { updateQuantity, removeItem, clearCart } from '../state/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../state/cart/cart.model';
import { CartItemComponent } from '../shared/components/card/cart-item.component';
import { CartSummaryComponent } from '../shared/components/card/cart-summary.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent, CartSummaryComponent],
  template: `
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto space-y-8">

      <h2 class="text-3xl font-bold text-gray-900">Your Cart</h2>

      <!-- Cart items -->
      <div *ngIf="(cartItems$ | async)?.length; else emptyCart" class="space-y-6">

        <div class="grid gap">
          <app-cart-item *ngFor="let item of cartItems$ | async"
            [item]="item"
            (qtyChange)="updateQty($event)"
            (remove)="remove($event)">
          </app-cart-item>
        </div>

        <!-- Summary & Actions -->
        <app-cart-summary 
          [total]="(cartTotal$ | async) || 0"
          (clear)="clear()"
          (checkout)="checkout()">
        </app-cart-summary>

      </div>

      <!-- Empty cart -->
      <ng-template #emptyCart>
        <div class="text-center py-16">
          <p class="text-gray-500 text-lg">Your cart is empty.</p>
          <button
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm"
            (click)="router.navigate(['/app/shop/products'])"
          >
            Continue Shopping
          </button>
        </div>
      </ng-template>

    </div>
  </div>
  `
})
export class CartPageComponent {
  private store = inject(Store);
  public router = inject(Router);

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
    this.router.navigate(['/app/shop/checkout/summary']);
  }
}
