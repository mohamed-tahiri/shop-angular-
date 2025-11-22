import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../../state/cart/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow hover:shadow-md transition">

      <!-- Image produit -->
      <div class="w-20 h-20 flex-shrink-0 mr-4">
        <img
          *ngIf="item.imageUrl; else noImage"
          [src]="item.imageUrl"
          alt="{{ item.name }}"
          class="w-full h-full object-cover rounded"
        />
        <ng-template #noImage>
          <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded">
            No Image
          </div>
        </ng-template>
      </div>

      <!-- Infos produit -->
      <div class="flex-1 flex flex-col gap-1">
        <p class="font-semibold text-gray-900 line-clamp-2">{{ item.name }}</p>
        <p class="text-sm text-gray-600">Price: {{ item.price | currency:'EUR' }}</p>
        <p class="text-sm text-gray-500">
          Stock: <span [ngClass]="item.stock && item.quantity > item.stock ? 'text-red-600 font-semibold' : 'text-gray-500'">
            {{ item.stock || 'N/A' }}
          </span>
        </p>
        <p *ngIf="item.stock && item.quantity > item.stock" class="text-red-600 text-sm font-medium">
          Exceeds stock!
        </p>
      </div>

      <!-- Quantité & actions -->
      <div class="flex flex-col items-end mt-3 sm:mt-0 space-y-2">
        <input
          type="number"
          [value]="item.quantity"
          [max]="item.stock || 100"
          min="1"
          (input)="qtyChange.emit({ id: item.id, quantity: $any($event.target).value })"
          class="border px-2 py-1 w-20 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          (click)="remove.emit(item.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition shadow-sm"
        >
          Remove
        </button>
      </div>

    </div>
  `
})
export class CartItemComponent {
  @Input() item!: CartItem & { stock?: number; imageUrl?: string };
  @Output() qtyChange = new EventEmitter<{ id: number; quantity: number }>();
  @Output() remove = new EventEmitter<number>();
}
