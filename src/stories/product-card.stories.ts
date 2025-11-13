import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from '../app/components/product-card/product-card.component';
import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../mocks/data';

const sampleProduct: Product = {
  id: 1,
  name: 'Stylo Bleu',
  price: 2.5,
  created_at: '2025-01-10T10:00:00Z',
  owner_id: 10,
  ratings: [{ user_id: 2, value: 4 }],
};

const sampleProductNoRating: Product = {
  id: 2,
  name: 'Cahier Rouge',
  price: 5,
  created_at: '2025-02-15T12:00:00Z',
  owner_id: 11,
  ratings: [],
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
