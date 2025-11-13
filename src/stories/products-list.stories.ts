import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from '../app/components/products-list/products-list.component';
import { ProductCardComponent } from '../app/components/product-card/product-card.component';
import { moduleMetadata } from '@storybook/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Product, products } from '../mocks/data';

const sampleProducts: Product[] = products;

const meta: Meta<ProductsListComponent> = {
  title: 'Shop/ProductsList',
  component: ProductsListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ProductsListComponent, // standalone
        ProductCardComponent,  // standalone
        MatGridListModule,
        MatCardModule
      ],
    }),
  ],
  args: {
    products: sampleProducts,
  },
};

export default meta;

export const Default: StoryObj<ProductsListComponent> = {};
