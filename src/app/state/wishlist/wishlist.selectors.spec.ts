import { selectWishlistItems, selectWishlistCount } from './wishlist.selectors';

describe('Wishlist Selectors', () => {

  const state: any = {
    wishlist: {
      items: [
        { id: 1, name: 'Phone' },
        { id: 2, name: 'Laptop' }
      ]
    }
  };

  it('selectWishlistItems → retourne les produits wishlist', () => {
    const result = selectWishlistItems(state);
    expect(result.length).toBe(2);
  });

  it('selectWishlistCount → retourne le nombre de produits wishlist', () => {
    const count = selectWishlistCount(state);
    expect(count).toBe(2);
  });

});
