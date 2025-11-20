import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="mt-4 p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between">

      <!-- Sous-total -->
      <div class="text-lg font-bold text-gray-900">
        Subtotal: {{ total | currency:'EUR' }}
      </div>

      <!-- Actions -->
      <div class="mt-3 md:mt-0 flex gap-2 justify-end">
        <button
          (click)="clear.emit()"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Clear Cart
        </button>

        <button
          (click)="checkout.emit()"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  `
})
export class CartSummaryComponent {
  @Input() total = 0;
  @Output() clear = new EventEmitter<void>();
  @Output() checkout = new EventEmitter<void>();
}
