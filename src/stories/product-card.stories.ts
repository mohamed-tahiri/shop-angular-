import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../mocks/data';
import { ProductCardComponent } from '../app/shared/components/product-card/product-card.component';

const sampleProduct: Product = {
  id: 1,
  name: 'Stylo Bleu',
  price: 2.5,
  created_at: '2025-01-10T10:00:00Z',
  owner_id: 10,
  ratings: [{ user: 2, value: 4 }],
  stock: 10,
  image_url: 'http://googleusercontent.com/image_collection/image_retrieval/9138089119264935398_0',
  lowStockThreshold: 5,
  
};

const sampleProductNoRating: Product = {
  id: 2,
  name: 'Cahier Rouge',
  price: 5,
  created_at: '2025-02-15T12:00:00Z',
  owner_id: 11,
  ratings: [],
  stock: 10,
  image_url: 'http://googleusercontent.com/image_collection/image_retrieval/9138089119264935398_0',
  lowStockThreshold: 3,
};

const meta: Meta<ProductCardComponent> = {
  title: 'Shop/Product Card',
  component: ProductCardComponent,
  decorators: [
    moduleMetadata({
      imports: [MatCardModule],
    }),
  ],
  args: { product: sampleProduct },
};

export default meta;

export const Default: StoryObj<ProductCardComponent> = {};

export const NoRating: StoryObj<ProductCardComponent> = {
  args: { product: sampleProductNoRating },
};
