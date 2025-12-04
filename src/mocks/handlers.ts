/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products, Review } from './data';
import { paginate, avgRating } from './utils';
import { mockUser } from './mock-user';
import { mockOrders } from './mock-orders';
import { User } from './user';
import { mockAdminStats } from './admin';

let wishlist: number[] = [1, 2, 3]; // Initial wishlist with some product IDs

const API = '/api';

export const handlers = [
  // -----------------------------
  // Auth
  // -----------------------------
  http.post(`${API}/auth/token/`, async () => {
    return HttpResponse.json(
      { access: 'mock-access-token', refresh: 'mock-refresh-token' },
      { status: 200 },
    );
  }),

  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json({ access: 'mock-access-token-refreshed' }, { status: 200 });
  }),

  // -----------------------------
  // Products
  // -----------------------------
  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    // Calcul de la note moyenne
    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    // Tri selon ordering
    const sign = ordering.startsWith('-') ? -1 : 1;
    let key = ordering.replace(/^-/, '');

    // Si tri par rating, utiliser _avg
    if (key === 'avg') key = '_avg';

    rows.sort((a: any, b: any) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign);

    const { count, results } = paginate(rows, page, page_size);
    return HttpResponse.json({ count, next: null, previous: null, results }, { status: 200 });
  }),


  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const product = products.find((x) => x.id === id);
    if (!product) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });

    return HttpResponse.json(
      { product_id: id, avg_rating: avgRating(product.ratings), count: product.ratings.length },
      { status: 200 },
    );
  }),

  http.get(`${API}/products/:id/reviews/`, ({ params }) => {
    const id = Number(params['id']);
    const product = products.find((x) => x.id === id);

    if (!product) {
      return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    }

    if (!('reviews' in product)) {
      (product as any).reviews = [];
    }

    // Retourne directement le tableau des reviews
    return HttpResponse.json(product.reviews, { status: 200 });
  }),


  http.post(`${API}/products/:id/reviews/`, async ({ params, request }) => {
    const id = Number(params['id']);
    const product = products.find((x) => x.id === id);

    if (!product) {
      return HttpResponse.json({ detail: 'Product not found.' }, { status: 404 });
    }

    const body = (await request.json()) as { value: number; comment: string };

    // Validation rating
    if (typeof body.value !== 'number' || body.value < 1 || body.value > 5) {
      return HttpResponse.json({ detail: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    // Validation comment
    if (!body.comment || body.comment.trim().length === 0) {
      return HttpResponse.json({ detail: 'Comment cannot be empty.' }, { status: 400 });
    }

    const newReview: Review = {
      user: Number(mockUser.id),
      value: body.value,
      comment: body.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    // Add rating
    if (!Array.isArray(product.ratings)) product.ratings = [];
    product.ratings.push({ user: newReview.user, value: newReview.value });

    // Add review
    if (!Array.isArray((product as any).reviews)) (product as any).reviews = [];
    (product as any).reviews.push(newReview);

    return HttpResponse.json(newReview, { status: 201 });
  }),

  // -----------------------------
  // User / Account
  // -----------------------------
  http.get(`${API}/me/`, async () => HttpResponse.json(mockUser, { status: 200 })),

  http.patch(`${API}/me/`, async ({ request }) => {
    const updates = (await request.json()) as Partial<User>;
    const user: User = {
      ...mockUser,
      ...updates,
      preferences: { ...mockUser.preferences, ...(updates.preferences || {}) },
    };
    return HttpResponse.json(user, { status: 200 });
  }),

  http.get(`${API}/me/orders/`, async () => HttpResponse.json(mockUser.orders, { status: 200 })),

  http.get(`${API}/orders/:id`, async ({ params }) => {
    const order = mockOrders.find((o) => o.id === params['id']);
    if (!order) return HttpResponse.json({ message: 'Order not found' }, { status: 404 });
    return HttpResponse.json(order, { status: 200 });
  }),

  // -----------------------------
  // Wishlist
  // -----------------------------
  http.get(`${API}/me/wishlist/`, async () => HttpResponse.json({ productIds: wishlist }, { status: 200 })),

  http.post(`${API}/me/wishlist/`, async ({ request }) => {
    const { productId } = (await request.json()) as { productId: number };
    if (typeof productId !== 'number') return HttpResponse.json({ error: 'Invalid productId' }, { status: 400 });

    if (wishlist.includes(productId)) wishlist = wishlist.filter((id) => id !== productId);
    else wishlist.push(productId);

    return HttpResponse.json({ success: true, productIds: wishlist }, { status: 200 });
  }),

  http.post(`${API}/cart/apply-promo/`, async ({ request }) => {
    const { items, code } = (await request.json()) as { items: any, code: string };

    let itemsTotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    let discount = 0;
    let shipping = 5; // valeur par défaut
    let taxes = itemsTotal * 0.2; // TVA 20%
    let appliedPromos: string[] = [];

    switch (code) {
      case 'WELCOME10':
        discount = itemsTotal * 0.1;
        appliedPromos.push('WELCOME10');
        break;
      case 'FREESHIP':
        shipping = 0;
        appliedPromos.push('FREESHIP');
        break;
      case 'VIP20':
        if (itemsTotal > 100) { // seuil par exemple
          discount = itemsTotal * 0.2;
          appliedPromos.push('VIP20');
        }
        break;
    }

    const grandTotal = itemsTotal - discount + shipping + taxes;

    return HttpResponse.json({ itemsTotal, discount, shipping, taxes, grandTotal, appliedPromos }, { status: 200 });
  }),

  // -----------------------------
  // Admin Dashboard Stats
  // -----------------------------
  http.get(`${API}/admin/stats/`, async () => {
    return HttpResponse.json(mockAdminStats, { status: 200 });
  }),

];
