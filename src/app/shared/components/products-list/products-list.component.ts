import { Component, Input, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../../../mocks/data';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatProgressSpinnerModule],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
  skeletonArray = Array(8).fill(0);
}
