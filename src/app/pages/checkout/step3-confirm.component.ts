import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCart } from '../../state/cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-step3-confirm',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-8">

      <h2 class="text-3xl font-bold text-gray-800 mb-6">✅ Confirm Your Order</h2>

      <mat-card class="p-6 shadow-lg rounded-lg space-y-4">
        <p class="text-gray-700 text-lg">Thank you for shopping with us! Please review your order details and confirm to complete the purchase.</p>

        <div class="flex justify-between mt-6">
          <button mat-stroked-button color="warn" (click)="back()" class="transition hover:scale-105">Back</button>
          <button mat-raised-button color="primary" (click)="confirm()" class="transition hover:scale-105">Confirm Order</button>
        </div>
      </mat-card>

    </div>
  </div>
  `
})
export class Step3ConfirmComponent {
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  back() {
    this.router.navigate(['/app/shop/checkout/address']);
  }

  confirm() {
    this.store.dispatch(clearCart());
    this.snackBar.open(`Order confirmed! 🎉`, 'Close', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    this.router.navigate(['/app/shop/products']);
  }
}
