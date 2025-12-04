import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal } from '../../../state/cart/cart.selectors';
import { updateQuantity, removeItem, clearCart } from '../../../state/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../state/cart/cart.model';
import { CartItemComponent } from '../../../shared/components/card/cart-item.component';
import { CartSummaryComponent } from '../../../shared/components/card/cart-summary.component';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent, CartSummaryComponent, PageWrapperComponent],
  templateUrl: './cart.component.html' ,
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.router.navigate(['/shop/checkout/summary']);
  }
}
