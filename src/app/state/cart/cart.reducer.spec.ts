import { cartReducer, initialState } from './cart.reducer';
import * as CartActions from './cart.actions';
import { CartState } from './cart.model';

describe('CartReducer', () => {
  const item = {
    id: 1,
    name: 'Product A',
    price: 100,
    quantity: 1,
    created_at: new Date().toISOString(),
    imageUrl: 'https://example.com/image.png'
  };

  it('addItem → incrémente count et totalPrice', () => {
    const action = CartActions.addItem({ item });

    const state = cartReducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.count).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it('addItem sur item existant → incrémente la quantité', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 1,
      totalPrice: 100,
      coupon: null,
      discountAmount: 0
    };

    const action = CartActions.addItem({
      item: { ...item, quantity: 2 }
    });

    const state = cartReducer(startState, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.count).toBe(3);
    expect(state.totalPrice).toBe(300);
  });

  it('updateQuantity → recalcule totalPrice et count', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 1,
      totalPrice: 100,
      coupon: null,
      discountAmount: 0
    };

    const action = CartActions.updateQuantity({
      productId: 1,
      quantity: 3
    });

    const state = cartReducer(startState, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.count).toBe(3);
    expect(state.totalPrice).toBe(300);
  });

  it('removeItem → supprime item et recalcule totaux', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 1,
      totalPrice: 100,
      coupon: null,
      discountAmount: 0
    };

    const action = CartActions.removeItem({ productId: 1 });

    const state = cartReducer(startState, action);

    expect(state.items.length).toBe(0);
    expect(state.count).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('applyCoupon → calcule discountAmount', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 1,
      totalPrice: 100,
      coupon: null,
      discountAmount: 0
    };

    const action = CartActions.applyCoupon({
      coupon: { code: 'PROMO10', discountPercent: 10 }
    });

    const state = cartReducer(startState, action);

    expect(state.coupon?.code).toBe('PROMO10');
    expect(state.discountAmount).toBe(10);
  });

  it('removeCoupon → supprime la réduction', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 1,
      totalPrice: 100,
      coupon: { code: 'PROMO10', discountPercent: 10 },
      discountAmount: 10
    };

    const action = CartActions.removeCoupon();

    const state = cartReducer(startState, action);

    expect(state.coupon).toBeNull();
    expect(state.discountAmount).toBe(0);
  });

  it('clearCart → réinitialise le panier', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ ...item }],
      count: 2,
      totalPrice: 200,
      coupon: null,
      discountAmount: 0
    };

    const action = CartActions.clearCart();

    const state = cartReducer(startState, action);

    expect(state.items.length).toBe(0);
    expect(state.count).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

});
