import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-step2-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">📦 Shipping Address</h2>

    <mat-card class="p-6 shadow-lg rounded-lg space-y-6 bg-white">
      <form [formGroup]="addressForm" class="space-y-4">
        
        <!-- Full Name -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Full Name</label>
          <input formControlName="fullName" type="text" class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition"/>
          <div *ngIf="addressForm.controls['fullName'].invalid && addressForm.controls['fullName'].touched" class="text-red-500 text-sm mt-1">
            Full Name is required
          </div>
        </div>

        <!-- Address -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Address</label>
          <input formControlName="address" type="text" class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition"/>
          <div *ngIf="addressForm.controls['address'].invalid && addressForm.controls['address'].touched" class="text-red-500 text-sm mt-1">
            Address is required
          </div>
        </div>

        <!-- City -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">City</label>
          <input formControlName="city" type="text" class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition"/>
          <div *ngIf="addressForm.controls['city'].invalid && addressForm.controls['city'].touched" class="text-red-500 text-sm mt-1">
            City is required
          </div>
        </div>

        <!-- Postal Code -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Postal Code</label>
          <input formControlName="postalCode" type="text" class="border px-3 py-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition"/>
          <div *ngIf="addressForm.controls['postalCode'].invalid && addressForm.controls['postalCode'].touched" class="text-red-500 text-sm mt-1">
            Postal Code is required
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between mt-6">
          <button mat-stroked-button color="warn" type="button" (click)="back()" class="px-4 py-2 rounded hover:scale-105 transition transform">
            Back
          </button>
          <button mat-raised-button color="primary" type="button" (click)="next()" class="px-6 py-2 rounded hover:scale-105 transition transform">
            Next
          </button>
        </div>

      </form>
    </mat-card>
  </app-page-wrapper>
  `
})
export class Step2AddressComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  addressForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required]
  });

  back() {
    this.router.navigate(['/shop/checkout/summary']);
  }

  next() {
    if (this.addressForm.valid) {
      this.router.navigate(['/shop/checkout/confirm']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
