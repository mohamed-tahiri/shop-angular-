// src/app/pages/checkout/step1-summary.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem, Coupon } from '../../../state/cart/cart.model';
import { selectCartItems, selectCartTotal, selectCartDiscount } from '../../../state/cart/cart.selectors';
import { applyCoupon, removeCoupon } from '../../../state/cart/cart.actions';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PageWrapperComponent
  ],
  template: `
  <app-page-wrapper>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">🛒 Order Summary</h2>

    <div *ngIf="cartItems$ | async as items; else emptyCart" class="space-y-6">

      <mat-card *ngFor="let item of items" class="flex flex-col sm:flex-row justify-between items-center p-4 shadow rounded-lg hover:shadow-lg transition-transform transform hover:scale-[1.02]">
        <div class="flex items-center gap-4 w-full sm:w-2/3">
          <img [src]="item.imageUrl" alt="{{ item.name }}" class="w-20 h-20 object-cover rounded-md shadow-sm"/>
          <div class="space-y-1">
            <p class="font-semibold text-gray-700">{{ item.name }}</p>
            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
            <p *ngIf="item.stock !== undefined" class="text-sm"
                [ngClass]="{
                  'text-green-600': item.stock > (item.lowStockThreshold || 0),
                  'text-orange-600': item.stock > 0 && item.stock <= (item.lowStockThreshold || 0),
                  'text-red-600': item.stock === 0
                }">
              {{ item.stock === 0 ? 'Out of stock' :
                 item.stock <= (item.lowStockThreshold || 0) ? 'Only ' + item.stock + ' left' : 'In stock' }}
            </p>
          </div>
        </div>

        <div class="mt-3 sm:mt-0 sm:text-right w-full sm:w-1/3 font-bold text-gray-800 text-lg">
          {{ item.price * item.quantity | currency:'EUR' }}
        </div>
      </mat-card>

      <!-- Coupon Form -->
      <form [formGroup]="couponForm" class="flex flex-col sm:flex-row gap-2 items-center mt-4" (ngSubmit)="applyCouponCode()">
        <input formControlName="code" placeholder="Coupon code"
               class="border px-3 py-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 transition"/>
        <button mat-stroked-button color="primary" type="button" (click)="applyCouponCode()">Apply</button>
        <button mat-stroked-button color="warn" type="button" (click)="removeCouponCode()">Remove</button>
      </form>

      <div *ngIf="couponForm.controls['code'].invalid && couponForm.controls['code'].touched"
           class="text-red-500 mt-1 text-sm">
        Please enter a valid coupon code
      </div>

      <!-- Delivery Options -->
      <div class="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
        <h3 class="font-semibold text-lg mb-3 text-gray-800">🚚 Choose Delivery Method</h3>

        <form [formGroup]="deliveryForm" class="space-y-3">
          <div *ngFor="let option of deliveryOptions; trackBy: trackById" class="flex items-center gap-2">
            <input type="radio"
                   formControlName="method"
                   [value]="option.value"
                   class="w-4 h-4 text-blue-500"/>

            <label class="text-gray-700 cursor-pointer">
              {{ option.label }} —
              <span class="font-semibold">{{ option.price | currency:'EUR' }}</span>
            </label>
          </div>
        </form>

        <div *ngIf="freeShippingApplied" class="mt-2 text-sm text-green-600">
          ✅ Free shipping applied
        </div>
      </div>

      <!-- Totals -->
      <div class="text-right space-y-1 mt-4">
        <div class="text-gray-700">
          Subtotal: {{ cartTotal$ | async | currency:'EUR' }}
        </div>

        <div class="text-gray-500">
          Discount: {{ cartDiscount$ | async | currency:'EUR' }}
        </div>

        <div class="text-gray-700">
          Delivery: {{ getDeliveryPrice() | currency:'EUR' }}
        </div>

        <div class="text-xl text-blue-600 font-bold">
          Grand Total:
          {{
            ((cartTotal$ | async)! -
             (cartDiscount$ | async)! +
             getDeliveryPrice())
             | currency:'EUR'
          }}
        </div>
      </div>

      <!-- Proceed Button -->
      <div class="flex justify-end mt-6">
        <button mat-raised-button color="primary"
                class="px-6 py-3 font-medium rounded-lg shadow hover:scale-105 transition transform"
                (click)="next()">
          Proceed to Shipping
        </button>
      </div>
    </div>

    <!-- Empty Cart -->
    <ng-template #emptyCart>
      <p class="text-gray-400 text-lg italic text-center mt-10">
        Your cart is currently empty. Add some products to continue! 🛍️
      </p>
    </ng-template>

  </app-page-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  // Delivery options form
  deliveryForm: FormGroup = this.fb.group({
    method: ['standard', Validators.required]
  });

  // List of delivery choices
  deliveryOptions = [
    { value: 'standard', label: 'Standard Delivery (3–5 days)', price: 4.99 },
    { value: 'express', label: 'Express Delivery (1–2 days)', price: 9.99 },
    { value: 'pickup', label: 'Store Pickup', price: 0 },
  ];

  // Flag to indicate free shipping coupon applied
  freeShippingApplied = false;

  getDeliveryPrice(): number {
    // if free shipping coupon applied, always 0
    if (this.freeShippingApplied) {
      return 0;
    }
    const selected = this.deliveryForm.value.method;
    return this.deliveryOptions.find(o => o.value === selected)?.price || 0;
  }

  next() {
    this.router.navigate(['/shop/checkout/address'], {
      queryParams: { delivery: this.deliveryForm.value.method, freeShipping: this.freeShippingApplied }
    });
  }

  applyCouponCode() {
    if (!this.couponForm.valid) {
      this.couponForm.controls['code'].markAsTouched();
      return;
    }

    const code = this.couponForm.value.code.trim().toUpperCase();
    let coupon: Coupon | null = null;

    if (code === 'WELCOME10') {
      coupon = { code, discountPercent: 10 };
      // ensure freeShipping flag reset if a non-freeship coupon is applied
      this.freeShippingApplied = false;
      this.store.dispatch(applyCoupon({ coupon }));
      this.snackBar.open('Coupon WELCOME10 applied! 10% off 🎉', 'Close', { duration: 3000 });

    } else if (code === 'FREESHIP') {
      // set a local flag to zero the delivery price
      this.freeShippingApplied = true;

      // dispatch a coupon if you want it in state as well (optional)
      coupon = { code, discountPercent: 0 };
      this.store.dispatch(applyCoupon({ coupon }));

      this.snackBar.open('Free shipping applied! 🚚', 'Close', { duration: 3000 });

    } else if (code === 'VIP20') {
      // take current total once
      this.cartTotal$.pipe(first()).subscribe(total => {
        if (total >= 100) {
          coupon = { code, discountPercent: 20 };
          // reset freeShipping if previously applied (business decision)
          this.freeShippingApplied = false;
          this.store.dispatch(applyCoupon({ coupon }));
          this.snackBar.open('VIP20 applied! 20% off 🎉', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('VIP20 requires a minimum order of 100€ ❌', 'Close', { duration: 3000 });
        }
      });
    } else {
      // Unknown code
      this.snackBar.open('Invalid coupon code ❌', 'Close', { duration: 3000 });
    }

    // If coupon was created (WELCOME10, FREESHIP or VIP20 succeeded), dispatch it (VIP20 already dispatched inside)
    if (coupon && coupon.code !== 'VIP20') {
      // VIP20 already dispatched above when conditions met
      this.store.dispatch(applyCoupon({ coupon }));
    }

    // reset form input
    this.couponForm.reset();
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }

  removeCouponCode() {
    // remove coupon from store and reset freeShipping flag
    this.freeShippingApplied = false;
    this.store.dispatch(removeCoupon());
    this.snackBar.open('Coupon removed 🗑️', 'Close', { duration: 3000 });
  }
}
