import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ access: string; refresh: string }> {
    return this.http.post<{ access: string; refresh: string }>('/api/auth/token/', { username, password });
  }

  refresh(refresh: string): Observable<{ access: string }> {
    return this.http.post<{ access: string }>('/api/auth/token/refresh/', { refresh });
  }

  getProducts(params: { page?: number; page_size?: number; min_rating?: number; ordering?: string }) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null) p = p.set(k, String(v)); });
    return this.http.get<{ count: number; results: any[] }>('/api/products/', { params: p });
  }

  getRating(productId: number) {
    return this.http.get<{ product_id: number; avg_rating: number; count: number }>(`/api/products/${productId}/rating/`);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`/api/products/${productId}/`);
  }
}
