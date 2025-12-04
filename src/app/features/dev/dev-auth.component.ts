import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';

interface TokenResponse {
  access: string;
  refresh: string;
}
interface RefreshResponse {
  access: string;
}

@Component({
  standalone: true,
  selector: 'app-dev-auth',
  imports: [JsonPipe, RouterLink, NgIf, PageWrapperComponent], // <-- Ajout de NgIf ici
  template: `
  <app-page-wrapper>
    <!-- Navigation -->
    <nav class="flex gap-4 text-sm text-blue-600">
      <button type="button" routerLink="/dev" class="hover:underline">
        ← Dev index
      </button>
      <button type="button" routerLink="/" class="hover:underline">
        Accueil
      </button>
    </nav>

    <!-- Page Title -->
    <h2 class="text-3xl font-semibold text-gray-900">
      /api/auth/token/ & /api/auth/token/refresh/
    </h2>

    <!-- Action Buttons -->
    <div class="flex gap-4 mt-4">
      <button
        class="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white
                shadow-sm hover:bg-blue-700 transition-all duration-200"
        (click)="login()"
      >
        POST token
      </button>
      <button
        class="flex-1 rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white
                shadow-sm hover:bg-emerald-700 transition-all duration-200"
        (click)="refresh()"
      >
        POST refresh
      </button>
    </div>

    <!-- Login Response -->
    <div *ngIf="loginResp()" class="mt-6">
      <h3 class="text-lg font-medium text-gray-900">Login Response</h3>
      <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-x-auto">
        {{ loginResp() | json }}
      </pre>
    </div>

    <!-- Refresh Response -->
    <div *ngIf="refreshResp()" class="mt-6">
      <h3 class="text-lg font-medium text-gray-900">Refresh Response</h3>
      <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-x-auto">
        {{ refreshResp() | json }}
      </pre>
    </div>

    <!-- Error Message -->
    <div *ngIf="err()" class="mt-4 text-red-600 font-medium">
      {{ err() }}
    </div>
  <app-page-wrapper>
  `,
})
export class DevAuthComponent {
  readonly loginResp = signal<TokenResponse | null>(null);
  readonly refreshResp = signal<RefreshResponse | null>(null);
  readonly err = signal<string | null>(null);

  async login(): Promise<void> {
    this.err.set(null);
    this.loginResp.set(null);
    const res = await fetch('/api/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'demo', password: 'demo' }),
    });
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as TokenResponse;
    this.loginResp.set(data);
  }

  async refresh(): Promise<void> {
    this.err.set(null);
    this.refreshResp.set(null);
    const res = await fetch('/api/auth/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: 'mock-refresh-token' }),
    });
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as RefreshResponse;
    this.refreshResp.set(data);
  }
}
