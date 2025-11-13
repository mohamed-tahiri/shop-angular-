import { Component, Input } from '@angular/core';
import { Product } from '../../../mocks/data';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  template: `
    <mat-card class="h-full w-full flex flex-col justify-between p-4 shadow-sm hover:shadow-md transition">
      <div>
        <mat-card-header class="p-0 mb-2">
          <mat-card-title class="text-lg font-semibold">{{ product.name }} / {{ product.id }}</mat-card-title>
          <mat-card-subtitle class="text-gray-600">{{ product.price | currency:'EUR' }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="space-y-1 text-sm text-gray-700">
          <p>Created: {{ product.created_at | date:'short' }}</p>
          <p>Owner ID: {{ product.owner_id }}</p>
        </mat-card-content>
      </div>

      <mat-chip color="primary" selected class="mt-4 self-start">
        Avg Rating: {{ avgRating !== 'N/A' ? avgRating : 'No ratings' }}
      </mat-chip>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;

  get avgRating(): number | 'N/A' {
    if (!this.product?.ratings?.length) return 'N/A';
    const sum = this.product.ratings.reduce((acc, r) => acc + r.value, 0);
    return +(sum / this.product.ratings.length).toFixed(1);
  }
}
