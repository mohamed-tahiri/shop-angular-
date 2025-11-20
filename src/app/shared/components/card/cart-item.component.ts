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
    <div class="flex items-center justify-between mb-4 p-3 border rounded-lg bg-white shadow-sm">
      
      <!-- Image produit -->
      <div class="w-16 h-16 flex-shrink-0 mr-4">
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
      <div class="flex-1">
        <p class="font-semibold text-gray-900">{{ item.name }}</p>
        <p class="text-sm text-gray-500">Price: {{ item.price | currency:'EUR' }}</p>
        <p
          class="text-sm"
          [ngClass]="item.stock && item.quantity > item.stock ? 'text-red-600' : 'text-gray-500'"
        >
          Stock: {{ item.stock || 'N/A' }}
        </p>
        <p *ngIf="item.stock && item.quantity > item.stock" class="text-red-600 text-sm">
          Exceeds stock!
        </p>
      </div>

      <!-- Quantité & actions -->
      <div class="flex flex-col items-end space-y-2">
        <input
          type="number"
          [value]="item.quantity"
          [max]="item.stock || 100"
          min="1"
          (input)="qtyChange.emit({ id: item.id, quantity: $any($event.target).value })"
          class="border px-2 py-1 w-16 rounded text-center"
        />

        <button
          (click)="remove.emit(item.id)"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
