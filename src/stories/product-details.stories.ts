import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from '../mocks/data';
import { ProductDetailsPageComponent } from '../app/features/shop/products/details/product-details.component';

const sampleProduct: Product = {
  id: 18,
  name: 'Palette Aquarelle Pro',
  price: 9.5,
  created_at: '2025-04-15T11:10:00Z',
  owner_id: 15,
  ratings: [{ user: 8, value: 5 }],
  stock: 10,
  image_url: 'https://picsum.photos/seed/product-18/400/300',
  lowStockThreshold: 4,
};

const meta: Meta<ProductDetailsPageComponent> = {
  title: 'Shop/ProductDetails',
  component: ProductDetailsPageComponent,
  decorators: [
    moduleMetadata({
      imports: [ProductDetailsPageComponent, FormsModule, MatButtonModule],
    }),
  ],
  args: {
    // Utiliser of() pour créer un Observable
    product$: of(sampleProduct),
    avgRating$: of(4.5),
  },
};

export default meta;

export const Default: StoryObj<ProductDetailsPageComponent> = {};
