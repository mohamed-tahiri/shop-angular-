import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../app/state/cart/cart.model';
import { CartItemComponent } from '../app/shared/components/card/cart-item.component';

const sampleItem: CartItem = {
    id: 1,
    name: 'Cool Sneakers',
    price: 79.99,
    quantity: 2,
    imageUrl: 'https://via.placeholder.com/150',
    created_at: '2025-04-15T11:10:00Z'
};

const meta: Meta<CartItemComponent> = {
  title: 'Cart/CartItem',
  component: CartItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CartItemComponent, FormsModule, MatButtonModule],
    }),
  ],
  argTypes: {
    qtyChange: { action: 'quantity changed' },
    remove: { action: 'item removed' },
  },
  args: {
    item: sampleItem,
  },
};

export default meta;

export const Default: StoryObj<CartItemComponent> = {};
