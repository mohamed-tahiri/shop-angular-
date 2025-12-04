import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { OrderSummary, User } from '../../../mocks/user';
import { Review } from '../../../mocks/data';
import { CartItem } from '../../state/cart/cart.model';
import { AdminStats } from '../../../mocks/admin';

export interface ApplyPromoResponse {
  valid: boolean;
  promoCode: string;
  discountAmount: number;
  originalTotal: number;
  newTotal: number;
  message: string;
  appliedPromos: string[]; // 👈 ajoute ceci
}

@Injectable({ providedIn: 'root' })
export class ShopApiService {
  constructor(private http: HttpClient) {}

  // --- Auth ---
  login(username: string, password: string): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>('/api/auth/token/', { username, password });
  }

  refresh(refresh: string): Observable<{ access: string }> {
    return this.http.post<{ access: string }>('/api/auth/token/refresh/', { refresh });
  }

  // --- Products ---
  getProducts(params: { page?: number; page_size?: number; min_rating?: number; ordering?: string }) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) p = p.set(k, String(v));
    });
    return this.http.get<{ count: number; results: any[] }>('/api/products/', { params: p });
  }

  getRating(productId: number) {
    return this.http.get<{ product_id: number; avg_rating: number; count: number }>(`/api/products/${productId}/rating/`);
  }

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/products/${productId}/reviews/`);
  }

  postReview(productId: number, payload: { value: number; comment?: string }): Observable<Review> {
    return this.http.post<Review>(`/api/products/${productId}/reviews/`, {
      value: payload.value,
      comment: payload.comment ?? ''  // <-- si undefined, on met une chaîne vide
    });
  }

  applyPromo(items: any[], code: string | null, shippingOption: string): Observable<ApplyPromoResponse> {
    return this.http.post<ApplyPromoResponse>('api/cart/apply-promo/', {
      items,
      code,
      shippingOption
    });
  }

  validateStock(items: CartItem[]): Observable<void> {
    const outOfStock = items.find(i => i.stock! < i.quantity);
    if (outOfStock) {
      return throwError({ error: `Stock insuffisant pour ${outOfStock.name}` });
    }
    return of(void 0);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`/api/products/${productId}/`);
  }

  // --- User / Account ---
  getUser(): Observable<User> {
    return this.http.get<User>('/api/me/');
  }

  updateUser(userUpdates: Partial<User>): Observable<User> {
    return this.http.patch<User>('/api/me/', userUpdates);
  }

  getOrders(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>('/api/me/orders/');
  }

  getOrder(id: string): Observable<OrderSummary> {
    return this.http.get<OrderSummary>(`/api/orders/${id}`);
  }

  getAdminStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>('/api/admin/stats/');
  }
}
