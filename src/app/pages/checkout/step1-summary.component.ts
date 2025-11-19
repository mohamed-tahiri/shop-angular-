import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotal, selectCartDiscount } from '../../state/cart/cart.selectors';
import { applyCoupon, removeCoupon } from '../../state/cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../state/cart/cart.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  template: `
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-8">

      <h2 class="text-3xl font-bold text-gray-800 mb-6">🛒 Your Order Summary</h2>

      <div *ngIf="cartItems$ | async as items; else emptyCart" class="space-y-6">

        <mat-card *ngFor="let item of items" class="p-4 flex justify-between items-center shadow hover:shadow-lg transition-shadow rounded-lg">
          <div class="flex items-center gap-4">
            <img [src]="item.imageUrl" alt="{{item.name}}" class="w-20 h-20 object-cover rounded-md"/>
            <div class="space-y-1">
              <p class="font-semibold text-gray-700">{{ item.name }}</p>
              <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
            </div>
          </div>
          <span class="font-bold text-gray-800">{{ item.price * item.quantity | currency:'EUR' }}</span>
        </mat-card>

        <form [formGroup]="couponForm" class="flex gap-2 items-center">
          <input formControlName="code" placeholder="Coupon code"
                 class="border px-3 py-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 transition"/>
          <button mat-stroked-button color="primary" type="button" (click)="applyCouponCode()">Apply</button>
          <button mat-stroked-button color="warn" type="button" (click)="removeCouponCode()">Remove</button>
        </form>
        <div *ngIf="couponForm.controls['code'].invalid && couponForm.controls['code'].touched" class="text-red-500 mt-1">
          Please enter a valid coupon code
        </div>

        <div class="text-right font-semibold space-y-1 mt-4">
          <div>Total: {{ cartTotal$ | async | currency:'EUR' }}</div>
          <div>Discount: {{ cartDiscount$ | async | currency:'EUR' }}</div>
          <div class="text-lg text-blue-600 font-bold">Grand Total: {{ (cartTotal$ | async)! - (cartDiscount$ | async)! | currency:'EUR' }}</div>
        </div>

        <div class="flex justify-end">
          <button mat-raised-button color="primary" class="transition transform hover:scale-105" (click)="next()">Proceed to Shipping</button>
        </div>
      </div>

      <ng-template #emptyCart>
        <p class="text-gray-400 text-lg italic">Your cart is currently empty. Add some products to continue! 🛍️</p>
      </ng-template>

    </div>
  </div>
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
