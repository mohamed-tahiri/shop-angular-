import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  template: `
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-8">
      <h2 class="text-2xl font-bold mb-4">Shipping Address</h2>

      <div class="p-4 space-y-4">
        <form [formGroup]="addressForm">
          <div class="space-y-2">
            <div>
              <label class="block font-medium">Full Name</label>
              <input formControlName="fullName" type="text" class="border px-3 py-2 w-full rounded"/>
              <div *ngIf="addressForm.controls['fullName'].invalid && addressForm.controls['fullName'].touched" class="text-red-500">
                Full Name is required
              </div>
            </div>

            <div>
              <label class="block font-medium">Address</label>
              <input formControlName="address" type="text" class="border px-3 py-2 w-full rounded"/>
              <div *ngIf="addressForm.controls['address'].invalid && addressForm.controls['address'].touched" class="text-red-500">
                Address is required
              </div>
            </div>

            <div>
              <label class="block font-medium">City</label>
              <input formControlName="city" type="text" class="border px-3 py-2 w-full rounded"/>
              <div *ngIf="addressForm.controls['city'].invalid && addressForm.controls['city'].touched" class="text-red-500">
                City is required
              </div>
            </div>

            <div>
              <label class="block font-medium">Postal Code</label>
              <input formControlName="postalCode" type="text" class="border px-3 py-2 w-full rounded"/>
              <div *ngIf="addressForm.controls['postalCode'].invalid && addressForm.controls['postalCode'].touched" class="text-red-500">
                Postal Code is required
              </div>
            </div>
          </div>

          <div class="mt-4 flex justify-between">
            <button mat-stroked-button color="warn" type="button" (click)="back()">Back</button>
            <button mat-raised-button color="primary" type="button" (click)="next()">Next</button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
    this.router.navigate(['/app/shop/checkout/summary']);
  }

  next() {
    if (this.addressForm.valid) {
      this.router.navigate(['/app/shop/checkout/confirm']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
