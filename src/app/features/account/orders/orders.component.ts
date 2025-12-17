import { Component, signal, OnInit, inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageWrapperComponent } from "../../../shared/components/UI/page-wrappe/page-wrapper.component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as UserActions from "../../../state/user/user.actions";
import { selectOrders, selectUserError } from "../../../state/user/user.selectors";
import { tap } from "rxjs/operators";
import { OrderSummary } from "../../../../mocks/user";

@Component({
  selector: 'orders-page',
  standalone: true,
  imports: [PageWrapperComponent, CommonModule],
  template: `
  <app-page-wrapper>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">✅ Mes commandes</h2>

    <div *ngIf="err()" class="text-red-600 mb-4">{{ err() }}</div>

    <div *ngIf="orders().length > 0; else noOrders" class="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div *ngFor="let order of orders(); trackBy: trackById"
           class="p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer"
           (click)="goToOrder(order.id)">
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-800">Commande #{{ order.id }}</span>
          <span class="text-sm text-gray-500">{{ order.date | date:'mediumDate' }}</span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span>Total: {{ order.total | currency:'EUR' }}</span>
          <span [ngClass]="{
            'text-yellow-600': order.status === 'en_cours',
            'text-blue-600': order.status === 'expédiée',
            'text-green-600': order.status === 'livrée'
          }" class="font-semibold">{{ order.status | titlecase }}</span>
        </div>
      </div>
    </div>

    <ng-template #noOrders>
      <p class="text-gray-500">Vous n'avez aucune commande pour le moment.</p>
    </ng-template>
  </app-page-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent implements OnInit {
  public router = inject(Router);
  private store = inject(Store);

  readonly orders = signal<OrderSummary[]>([]);
  readonly err = signal<string | null>(null);

  ngOnInit() {
    this.store.dispatch(UserActions.loadOrders());

    this.store.select(selectOrders).pipe(
      tap(orders => this.orders.set(orders))
    ).subscribe();

    this.store.select(selectUserError).pipe(
      tap(err => this.err.set(err))
    ).subscribe();
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }

  goToOrder(orderId: string) {
    this.router.navigate([`/account/orders/${orderId}`]);
  }
}
