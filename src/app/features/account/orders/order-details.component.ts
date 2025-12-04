import { Component, signal, OnInit, inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageWrapperComponent } from "../../../shared/components/UI/page-wrappe/page-wrapper.component";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as UserActions from "../../../state/user/user.actions";
import { selectSelectedOrder, selectUserError } from "../../../state/user/user.selectors";
import { tap } from "rxjs/operators";
import { OrderSummary } from "../../../../mocks/user";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'order-details',
  standalone: true,
  imports: [PageWrapperComponent, CommonModule, MatProgressSpinnerModule],
  template: `
  <app-page-wrapper>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Détail de la commande</h2>

    <div *ngIf="err()" class="text-red-600 mb-4">{{ err() }}</div>

    <div *ngIf="order(); else loading" class="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div class="flex justify-between items-center">
        <span class="font-medium text-gray-800">Commande #{{ order()?.id }}</span>
        <span [ngClass]="{
          'text-yellow-600': order()?.status === 'en_cours',
          'text-blue-600': order()?.status === 'expédiée',
          'text-green-600': order()?.status === 'livrée'
        }" class="font-semibold">{{ order()?.status | titlecase }}</span>
      </div>

      <p class="text-gray-500">Date de commande: {{ order()?.date | date:'medium' }}</p>

      <!-- Liste des articles -->
      <div class="border rounded-lg shadow-sm overflow-hidden">
        <div *ngFor="let item of order()?.items; trackBy: trackById" class="flex items-center gap-4 p-4 border-b last:border-b-0">
          <div class="flex-1">
            <p class="font-medium text-gray-800">{{ item.name }}</p>
            <p class="text-gray-500 text-sm">{{ item.quantity }} x {{ item.price | currency:'EUR' }}</p>
          </div>
          <span class="font-semibold text-gray-900">{{ (item.quantity * item.price) | currency:'EUR' }}</span>
        </div>
      </div>

      <!-- Totaux -->
      <div class="mt-4 space-y-1">
        <div class="flex justify-between text-gray-600">
          <span>Sous-total:</span>
          <span>{{ order()?.subTotal | currency:'EUR' }}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Taxes:</span>
          <span>{{ order()?.tax | currency:'EUR' }}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Frais de livraison:</span>
          <span>{{ order()?.shippingFee | currency:'EUR' }}</span>
        </div>
        <div class="flex justify-between font-bold text-gray-900 text-lg">
          <span>Total:</span>
          <span>{{ order()?.total | currency:'EUR' }}</span>
        </div>
      </div>
    </div>

    <ng-template #loading>
      <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
    </ng-template>
    
  </app-page-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsPageComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  readonly order = signal<OrderSummary | null>(null);
  readonly err = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.store.dispatch(UserActions.loadOrderDetail({ id }));

    this.store.select(selectSelectedOrder).pipe(
      tap(order => this.order.set(order))
    ).subscribe();

    this.store.select(selectUserError).pipe(
      tap(err => this.err.set(err))
    ).subscribe();
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }
}
