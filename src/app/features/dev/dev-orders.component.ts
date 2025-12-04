import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe, NgIf, NgForOf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { OrderSummary } from '../../../mocks/user';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'dev-orders',
  imports: [CommonModule, FormsModule, NgIf, NgForOf, RouterLink, PageWrapperComponent],
  template: `
    <app-page-wrapper>
      <nav class="flex gap-4 text-sm text-blue-600 mb-4">
        <button routerLink="/dev" class="hover:underline">← Dev index</button>
        <button routerLink="/" class="hover:underline">Accueil</button>
      </nav>

      <h2 class="text-3xl font-semibold text-gray-900 mb-4">/api/me/orders/ & /api/orders/:id</h2>

      <!-- Action Buttons -->
      <div class="flex gap-4 mb-4">
        <button
          class="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white
                 shadow-sm hover:bg-blue-700 transition-all duration-200"
          (click)="loadOrders()"
        >
          GET Orders
        </button>
        <button
          class="flex-1 rounded-2xl bg-gray-600 px-5 py-3 font-medium text-white
                 shadow-sm hover:bg-gray-700 transition-all duration-200"
          (click)="toggleOrder()"
        >
          Trier par ID {{ sortAsc() ? '↑' : '↓' }}
        </button>
      </div>

      <!-- Liste des commandes -->
      <div *ngIf="orders().length; else empty">
        <div *ngFor="let order of orders(); trackBy: trackById" class="mb-2 p-3 border rounded-lg bg-gray-50">
          <div class="flex justify-between">
            <span>Commande #{{ order.id }}</span>
            <span>{{ order.status | titlecase }}</span>
          </div>
          <div class="text-sm text-gray-500">
            {{ order.date }} — Total : {{ order.total | currency }}
          </div>
        </div>
      </div>
      <ng-template #empty>
        <p class="text-gray-500">Aucune commande trouvée.</p>
      </ng-template>

      <!-- Récupérer une commande par ID -->
      <div class="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="ID commande"
          [(ngModel)]="orderId"
          class="border rounded px-3 py-2 flex-1"
        />
        <button
          class="rounded-2xl bg-emerald-600 px-5 py-2 font-medium text-white
                 shadow-sm hover:bg-emerald-700 transition-all duration-200"
          (click)="loadOrderById()"
        >
          GET /orders/:id
        </button>
      </div>

      <div *ngIf="orderDetail()" class="mt-4 p-4 border rounded bg-gray-50">
        <h3 class="font-medium text-gray-900">Détails commande #{{ orderDetail()?.id }}</h3>
        <pre class="text-sm overflow-x-auto">{{ orderDetail() | json }}</pre>
      </div>

      <div *ngIf="err()" class="mt-4 text-red-600 font-medium">
        {{ err() }}
      </div>
    </app-page-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevOrdersComponent {
  readonly orders = signal<OrderSummary[]>([]);
  readonly orderDetail = signal<OrderSummary | null>(null);
  readonly sortAsc = signal(true);
  readonly err = signal<string | null>(null);
  orderId: string = '';

  async loadOrders(): Promise<void> {
    this.err.set(null);
    this.orderDetail.set(null);
    try {
      const res = await fetch('/api/me/orders/');
      if (!res.ok) {
        this.err.set(`${res.status} ${res.statusText}`);
        return;
      }
      const data = (await res.json()) as OrderSummary[];
      data.sort((a, b) => a.id.localeCompare(b.id)); // tri par défaut
      this.orders.set(data);
      this.sortAsc.set(true);
    } catch (e: any) {
      this.err.set(e.message);
    }
  }

  toggleOrder(): void {
    const asc = this.sortAsc();
    const sorted = [...this.orders()].sort((a, b) =>
      asc ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id)
    );
    this.orders.set(sorted);
    this.sortAsc.set(!asc);
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }

  async loadOrderById(): Promise<void> {
    this.err.set(null);
    this.orderDetail.set(null);
    if (!this.orderId) return;
    try {
      const res = await fetch(`/api/orders/${this.orderId}`);
      if (!res.ok) {
        this.err.set(`${res.status} ${res.statusText}`);
        return;
      }
      const data = (await res.json()) as OrderSummary;
      this.orderDetail.set(data);
    } catch (e: any) {
      this.err.set(e.message);
    }
  }
}
