import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { CartSummaryComponent } from '../app/shared/components/card/cart-summary.component';

const meta: Meta<CartSummaryComponent> = {
  title: 'Cart/CartSummary',
  component: CartSummaryComponent,
  decorators: [
    moduleMetadata({
      imports: [CartSummaryComponent, MatButtonModule],
    }),
  ],
  argTypes: {
    clear: { action: 'cart cleared' },
    checkout: { action: 'checkout clicked' },
  },
  args: {
    total: 199.99,
  },
};

export default meta;

export const Default: StoryObj<CartSummaryComponent> = {};
