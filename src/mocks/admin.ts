export interface AdminStats{
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: {
    productId: string;
    name: string;
    sold: number;
    revenue: number;
  }[];
  recentOrders: {
    id: string;
    user: string;
    total: number;
    createdAt: string;
    status: string;
  }[];
}

export const mockAdminStats: AdminStats = {
  totalUsers: 1234,
  totalOrders: 56,
  totalRevenue: 7890, // chiffre total simulé

  topProducts: [
    { productId: '1', name: 'Stylo Bleu Pro', sold: 45, revenue: 112.5 },
    { productId: '2', name: 'Cahier A5 Classique', sold: 30, revenue: 117 },
    { productId: '3', name: 'Classeur Anneaux Rouge', sold: 25, revenue: 112.5 },
    { productId: '4', name: 'Crayon HB Écologique', sold: 20, revenue: 24 },
    { productId: '5', name: 'Règle 30cm Transparente', sold: 15, revenue: 22.5 },
  ],

  recentOrders: [
    { id: '101', user: 'Alice', total: 45, createdAt: '2025-11-27T10:30:00Z', status: 'pending' },
    { id: '102', user: 'Bob', total: 75, createdAt: '2025-11-26T15:20:00Z', status: 'shipped' },
    { id: '103', user: 'Charlie', total: 120, createdAt: '2025-11-25T09:15:00Z', status: 'delivered' },
    { id: '104', user: 'David', total: 60, createdAt: '2025-11-24T18:45:00Z', status: 'pending' },
    { id: '105', user: 'Eve', total: 90, createdAt: '2025-11-23T12:00:00Z', status: 'shipped' },
  ],
};
