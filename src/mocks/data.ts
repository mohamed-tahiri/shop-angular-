// Définition de l'interface pour un produit
export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  ratings: { user_id: number; value: number }[];
  stock: number;
  image_url: string; 
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Stylo Bleu Pro',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 2, value: 4 }],
    stock: 10,
    // URL Aléatoire 1
    image_url: 'https://picsum.photos/seed/product-1/400/300' 
  },
  {
    id: 2,
    name: 'Cahier A5 Classique',
    price: 3.9,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user_id: 3, value: 5 }],
    stock: 10,
    // URL Aléatoire 2
    image_url: 'https://picsum.photos/seed/product-2/400/300' 
  },
  {
    id: 3,
    name: 'Classeur Anneaux Rouge',
    price: 4.5,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user_id: 4, value: 3 }],
    stock: 10,
    // URL Aléatoire 3
    image_url: 'https://picsum.photos/seed/product-3/400/300'
  },
  {
    id: 4,
    name: 'Crayon HB Écologique',
    price: 1.2,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user_id: 2, value: 5 }],
    stock: 10,
    // URL Aléatoire 4
    image_url: 'https://picsum.photos/seed/product-4/400/300'
  },
  {
    id: 5,
    name: 'Règle 30cm Transparente',
    price: 1.5,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user_id: 1, value: 4 }],
    stock: 10,
    // URL Aléatoire 5
    image_url: 'https://picsum.photos/seed/product-5/400/300'
  },
  {
    id: 6,
    name: 'Gomme Blanche Ergonomique',
    price: 0.9,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 3, value: 4 }],
    stock: 10,
    // URL Aléatoire 6
    image_url: 'https://picsum.photos/seed/product-6/400/300'
  },
  {
    id: 7,
    name: 'Surligneur Jaune Fluo',
    price: 1.7,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user_id: 6, value: 5 }],
    stock: 10,
    // URL Aléatoire 7
    image_url: 'https://picsum.photos/seed/product-7/400/300'
  },
  {
    id: 8,
    name: 'Pochette Plastique A4',
    price: 0.3,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 3, value: 3 }],
    stock: 10,
    // URL Aléatoire 8
    image_url: 'https://picsum.photos/seed/product-8/400/300'
  },
  {
    id: 9,
    name: 'Feutre Noir Permanent',
    price: 2.0,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user_id: 5, value: 4 }],
    stock: 10,
    // URL Aléatoire 9
    image_url: 'https://picsum.photos/seed/product-9/400/300'
  },
  {
    id: 10,
    name: 'Bloc Notes Spirale',
    price: 3.0,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user_id: 7, value: 5 }],
    stock: 10,
    // URL Aléatoire 10
    image_url: 'https://picsum.photos/seed/product-10/400/300'
  },
  {
    id: 11,
    name: 'Feuilles A4 Perforées',
    price: 4.0,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user_id: 2, value: 4 }],
    stock: 10,
    // URL Aléatoire 11
    image_url: 'https://picsum.photos/seed/product-11/400/300'
  },
  {
    id: 12,
    name: 'Trousse Bleue Zip',
    price: 6.5,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user_id: 8, value: 5 }],
    stock: 10,
    // URL Aléatoire 12
    image_url: 'https://picsum.photos/seed/product-12/400/300'
  },
  {
    id: 13,
    name: 'Colle Bâton Forte',
    price: 1.3,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 9, value: 3 }],
    stock: 10,
    // URL Aléatoire 13
    image_url: 'https://picsum.photos/seed/product-13/400/300'
  },
  {
    id: 14,
    name: 'Ruban Adhésif Invisible',
    price: 2.8,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user_id: 1, value: 4 }],
    stock: 10,
    // URL Aléatoire 14
    image_url: 'https://picsum.photos/seed/product-14/400/300'
  },
  {
    id: 15,
    name: 'Stylo Rouge Gel',
    price: 2.5,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user_id: 3, value: 5 }],
    stock: 10,
    // URL Aléatoire 15
    image_url: 'https://picsum.photos/seed/product-15/400/300'
  },
  {
    id: 16,
    name: 'Feutres Couleur (Pack x10)',
    price: 7.9,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user_id: 6, value: 4 }],
    stock: 10,
    // URL Aléatoire 16
    image_url: 'https://picsum.photos/seed/product-16/400/300'
  },
  {
    id: 17,
    name: 'Pinceau Fin Précision',
    price: 2.2,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user_id: 5, value: 3 }],
    stock: 10,
    // URL Aléatoire 17
    image_url: 'https://picsum.photos/seed/product-17/400/300'
  },
  {
    id: 18,
    name: 'Palette Aquarelle Pro',
    price: 9.5,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 8, value: 5 }],
    stock: 10,
    // URL Aléatoire 18
    image_url: 'https://picsum.photos/seed/product-18/400/300'
  },
  {
    id: 19,
    name: 'Marqueur Effaçable Noir',
    price: 3.4,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user_id: 2, value: 4 }],
    stock: 10,
    // URL Aléatoire 19
    image_url: 'https://picsum.photos/seed/product-19/400/300'
  },
  {
    id: 20,
    name: 'Tampon Encreur Automatique',
    price: 5.0,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 9, value: 4 }],
    stock: 10,
    // URL Aléatoire 20
    image_url: 'https://picsum.photos/seed/product-20/400/300'
  },
];