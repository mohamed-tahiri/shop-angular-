import { selectCartItems } from './cart.selectors';

describe('Cart Selectors', () => {

  it('selectCartItems → retourne les items du panier', () => {
    const state: any = {
      cart: {
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 }
        ]
      }
    };

    const items = selectCartItems(state);

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    expect(totalItems).toBe(5);
  });

});
