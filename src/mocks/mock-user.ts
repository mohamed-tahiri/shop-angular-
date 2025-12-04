import { User } from "./user";

export let mockUser: User = {
  id: 'u123',
  username: 'mohamed_t',
  email: 'mohamed@example.com',
  fullName: 'Mohamed Tahiri',
  defaultAddress: {
    street: '12 Rue des Écoles',
    city: 'Paris',
    zip: '75010',
    country: 'France'
  },
  preferences: {
    newsletter: true,
    defaultMinRating: 3
  },
  orders: [
    {
      id: 'ord-101',
      date: '2025-03-20T14:00:00Z',
      status: 'livrée',
      items: [
        { productId: 1, name: 'Stylo Bleu Pro', quantity: 2, price: 2.5, total: 5 },
        { productId: 10, name: 'Bloc Notes Spirale', quantity: 3, price: 3.0, total: 9 },
        { productId: 6, name: 'Gomme Blanche Ergonomique', quantity: 5, price: 0.9, total: 4.5 }
      ],
      subTotal: 18.5,
      tax: 3.5,
      shippingFee: 5.9,
      total: 27.9
    },
    {
      id: 'ord-102',
      date: '2025-04-02T09:30:00Z',
      status: 'expédiée',
      items: [
        { productId: 3, name: 'Classeur Anneaux Rouge', quantity: 1, price: 4.5, total: 4.5 },
        { productId: 7, name: 'Surligneur Jaune Fluo', quantity: 2, price: 1.7, total: 3.4 }
      ],
      subTotal: 7.9,
      tax: 1.5,
      shippingFee: 3.0,
      total: 12.4
    }
  ]
};
