// data.ts (Fichier Corrigé et Complété)

// Définition de l'interface pour un avis complet (Review)
export interface Review {
  user: number; // L'ID de l'utilisateur qui a laissé l'avis (utilisé pour le mock)
  value: number; // La note (rating)
  comment?: string; // Le commentaire optionnel
  createdAt?: string; // Ajouté pour les mocks de liste d'avis
}

export interface PaginatedReviews {
  count: number;
  results: Review[];
}

// Définition de l'interface pour un produit
export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  // 'ratings' est utilisé pour la rétrocompatibilité (calcul de la note moyenne rapide)
  ratings: Review[];
  // 'reviews' est la nouvelle liste d'avis complets (pour GET /reviews/)
  reviews?: Review[]; 
  stock: number;
  image_url: string; 
  lowStockThreshold: number;
}

// Pour garantir la mutabilité nécessaire au POST MSW
export let products: Product[] = [ 
  {
    id: 1,
    name: 'Stylo Bleu Pro',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user: 2, value: 4 }],
    reviews: [
      { user: 2, value: 4, comment: "Bon stylo, l'encre ne coule pas.", createdAt: '2025-01-15T10:00:00Z' },
    ],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-1/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 2,
    name: 'Cahier A5 Classique',
    price: 3.9,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user: 3, value: 5 }],
    reviews: [
      { user: 3, value: 5, comment: "Feuilles épaisses et bonne reliure. Parfait pour l'école.", createdAt: '2025-02-05T09:30:00Z' },
      { user: 5, value: 5, comment: "Rien à redire, excellent rapport qualité-prix.", createdAt: '2025-02-06T11:00:00Z' },
    ],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-2/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 3,
    name: 'Classeur Anneaux Rouge',
    price: 4.5,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user: 4, value: 3 }],
    reviews: [
      { user: 4, value: 3, comment: "Fait le travail, mais les anneaux sont un peu durs à ouvrir.", createdAt: '2025-02-20T12:00:00Z' },
    ],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-3/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 4,
    name: 'Crayon HB Écologique',
    price: 1.2,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user: 2, value: 5 }],
    reviews: [
      { user: 2, value: 5, comment: "Se taille facilement et mine très résistante.", createdAt: '2025-03-05T08:45:00Z' },
    ],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-4/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 5,
    name: 'Règle 30cm Transparente',
    price: 1.5,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user: 1, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-5/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 6,
    name: 'Gomme Blanche Ergonomique',
    price: 0.9,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user: 3, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-6/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 7,
    name: 'Surligneur Jaune Fluo',
    price: 1.7,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user: 6, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-7/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 8,
    name: 'Pochette Plastique A4',
    price: 0.3,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user: 3, value: 3 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-8/400/300',
    lowStockThreshold: 10,
  },
  {
    id: 9,
    name: 'Feutre Noir Permanent',
    price: 2.0,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user: 5, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-9/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 10,
    name: 'Bloc Notes Spirale',
    price: 3.0,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user: 7, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-10/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 11,
    name: 'Feuilles A4 Perforées',
    price: 4.0,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user: 2, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-11/400/300',
    lowStockThreshold: 8,
  },
  {
    id: 12,
    name: 'Trousse Bleue Zip',
    price: 6.5,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user: 8, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-12/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 13,
    name: 'Colle Bâton Forte',
    price: 1.3,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user: 9, value: 3 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-13/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 14,
    name: 'Ruban Adhésif Invisible',
    price: 2.8,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user: 1, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-14/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 15,
    name: 'Stylo Rouge Gel',
    price: 2.5,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user: 3, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-15/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 16,
    name: 'Feutres Couleur (Pack x10)',
    price: 7.9,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user: 6, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-16/400/300',
    lowStockThreshold: 5,
  },
  {
    id: 17,
    name: 'Pinceau Fin Précision',
    price: 2.2,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user: 5, value: 3 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-17/400/300',
    lowStockThreshold: 2,
  },
  {
    id: 18,
    name: 'Palette Aquarelle Pro',
    price: 9.5,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user: 8, value: 5 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-18/400/300',
    lowStockThreshold: 4,
  },
  {
    id: 19,
    name: 'Marqueur Effaçable Noir',
    price: 3.4,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user: 2, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-19/400/300',
    lowStockThreshold: 3,
  },
  {
    id: 20,
    name: 'Tampon Encreur Automatique',
    price: 5.0,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user: 9, value: 4 }],
    stock: 10,
    image_url: 'https://picsum.photos/seed/product-20/400/300',
    lowStockThreshold: 3,
  },
];