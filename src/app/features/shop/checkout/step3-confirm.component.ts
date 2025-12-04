import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { clearCart } from '../../../state/cart/cart.actions';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">✅ Confirm Your Order</h2>

    <mat-card class="p-6 shadow-lg rounded-lg space-y-6 bg-white">
      <p class="text-gray-700 text-lg">
        Thank you for shopping with us! Please review your order details and confirm to complete the purchase.
      </p>

      <div class="flex justify-between mt-6">
        <button mat-stroked-button color="warn" (click)="back()" class="px-4 py-2 rounded hover:scale-105 transition transform">
          Back
        </button>
        <button mat-raised-button color="primary" (click)="confirm()" class="px-6 py-2 rounded hover:scale-105 transition transform">
          Confirm Order
        </button>
      </div>
    </mat-card>
  </app-page-wrapper>
  `
})
export class Step3ConfirmComponent {
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  back() {
    this.router.navigate(['/shop/checkout/address']);
  }

  confirm() {
    this.store.dispatch(clearCart());
    this.snackBar.open(`Order confirmed! 🎉`, 'Close', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    this.router.navigate(['/shop/products']);
  }
}
