import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Product } from '../../../mocks/data';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ProductCardComponent, MatProgressSpinnerModule],
  template: `
    <ng-container *ngIf="loading; else content">
      <div class="flex justify-center py-8">
        <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
      </div>
    </ng-container>

    <ng-template #content>
      <mat-grid-list [cols]="cols" rowHeight="1:1" gutterSize="16px" class="mb-4">
        <mat-grid-tile *ngFor="let product of products">
          <app-product-card [product]="product"></app-product-card>
        </mat-grid-tile>
      </mat-grid-list>

      <p *ngIf="!products?.length" class="text-center text-gray-500 mt-4">
        No products found.
      </p>
    </ng-template>
  `,
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() loading = false;

  cols = 4; // default desktop

  ngOnInit() {
    this.updateCols(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
  }

  private updateCols(width: number) {
    if (width < 640) this.cols = 1;      // mobile
    else if (width < 1024) this.cols = 2; // tablet
    else this.cols = 4;                  // desktop
  }
}
