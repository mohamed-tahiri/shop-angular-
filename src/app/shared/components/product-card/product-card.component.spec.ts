import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Product } from '../../../../mocks/data';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    created_at: '2025-01-01',
    owner_id: 1,
    ratings: [{ user: 1, value: 4 }],
    stock: 10,
    image_url: '',
    lowStockThreshold: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideMockStore({
          initialState: { wishlist: { items: [] } }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('affiche les informations produit', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('€100');
  });

  it('calcule avgRating correctement', () => {
    expect(component.avgRating).toBe(4);
  });
});
