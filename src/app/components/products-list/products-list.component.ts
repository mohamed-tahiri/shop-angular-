import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Product } from '../../../mocks/data';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatProgressSpinnerModule],
  template: `
    <div *ngIf="loading" class="flex justify-center py-10">
      <mat-progress-spinner diameter="50" mode="indeterminate"></mat-progress-spinner>
    </div>

    <div *ngIf="!loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <app-product-card
        *ngFor="let product of products"
        [product]="product">
      </app-product-card>
    </div>

    <p *ngIf="!loading && !products?.length" class="text-center text-gray-500 mt-4">
      No products found.
    </p>
  `,
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
}
