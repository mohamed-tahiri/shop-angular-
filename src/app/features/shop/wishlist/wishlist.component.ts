import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectWishlistItems } from '../../../state/wishlist/wishlist.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';
import { Product } from '../../../../mocks/data';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsListComponent, PageWrapperComponent],
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class WishlistPageComponent {
  private store = inject(Store);
  public router = inject(Router);

  wishlistItems$: Observable<Product[]> = this.store.select(selectWishlistItems);
}
