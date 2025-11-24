import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectCartDiscount, selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { CartItem } from '../../state/cart/cart.model';
import { applyCoupon, removeCoupon } from '../../state/cart/cart.actions';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <!-- Header -->
    <h2 class="text-3xl font-bold text-gray-800 mb-6">🛒 Order Summary</h2>

    <!-- Cart Items -->
    <div *ngIf="cartItems$ | async as items; else emptyCart" class="space-y-6">
      <mat-card *ngFor="let item of items" class="flex flex-col sm:flex-row justify-between items-center p-4 shadow rounded-lg hover:shadow-lg transition-transform transform hover:scale-[1.02]">
        
        <!-- Left: Image + Info -->
        <div class="flex items-center gap-4 w-full sm:w-2/3">
          <img [src]="item.imageUrl" alt="{{ item.name }}" class="w-20 h-20 object-cover rounded-md shadow-sm"/>
          <div class="space-y-1">
            <p class="font-semibold text-gray-700">{{ item.name }}</p>
            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
          </div>
        </div>

        <!-- Right: Price -->
        <div class="mt-3 sm:mt-0 sm:text-right w-full sm:w-1/3 font-bold text-gray-800 text-lg">
          {{ item.price * item.quantity | currency:'EUR' }}
        </div>
      </mat-card>

      <!-- Coupon Form -->
      <form [formGroup]="couponForm" class="flex flex-col sm:flex-row gap-2 items-center mt-4">
        <input formControlName="code" placeholder="Coupon code"
                class="border px-3 py-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 transition"/>
        <button mat-stroked-button color="primary" type="button" (click)="applyCouponCode()">Apply</button>
        <button mat-stroked-button color="warn" type="button" (click)="removeCouponCode()">Remove</button>
      </form>
      <div *ngIf="couponForm.controls['code'].invalid && couponForm.controls['code'].touched" class="text-red-500 mt-1 text-sm">
        Please enter a valid coupon code
      </div>

      <!-- Totals -->
      <div class="text-right space-y-1 mt-4">
        <div class="text-gray-700">Subtotal: {{ cartTotal$ | async | currency:'EUR' }}</div>
        <div class="text-gray-500">Discount: {{ cartDiscount$ | async | currency:'EUR' }}</div>
        <div class="text-xl text-blue-600 font-bold">Grand Total: {{ (cartTotal$ | async)! - (cartDiscount$ | async)! | currency:'EUR' }}</div>
      </div>

      <!-- Proceed Button -->
      <div class="flex justify-end mt-6">
        <button mat-raised-button color="primary" class="px-6 py-3 font-medium rounded-lg shadow hover:scale-105 transition transform"
                (click)="next()">Proceed to Shipping</button>
      </div>
    </div>

    <!-- Empty Cart -->
    <ng-template #emptyCart>
      <p class="text-gray-400 text-lg italic text-center mt-10">Your cart is currently empty. Add some products to continue! 🛍️</p>
    </ng-template>

  </app-page-wrapper>
  `
})
export class Step1SummaryComponent {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);
  cartDiscount$: Observable<number> = this.store.select(selectCartDiscount);

  couponForm: FormGroup = this.fb.group({
    code: ['', Validators.required]
  });

  next() {
    this.router.navigate(['/app/shop/checkout/address']);
  }

  applyCouponCode() {
    if (this.couponForm.valid) {
      const code = this.couponForm.value.code.trim();
      if (code === 'SAVE10') {
        this.store.dispatch(applyCoupon({ coupon: { code, discountPercent: 10 } }));
        this.snackBar.open('Coupon applied! 10% off 🎉', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Invalid coupon code ❌', 'Close', { duration: 3000 });
      }
    } else {
      this.couponForm.controls['code'].markAsTouched();
    }
  }

  removeCouponCode() {
    this.store.dispatch(removeCoupon());
    this.snackBar.open('Coupon removed 🗑️', 'Close', { duration: 3000 });
  }
}
