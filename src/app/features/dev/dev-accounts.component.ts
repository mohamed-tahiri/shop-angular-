import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { User } from '../../../mocks/user';

@Component({
  standalone: true,
  selector: 'dev-accounts',
  imports: [JsonPipe, NgIf, RouterLink, PageWrapperComponent],
  template: `
    <app-page-wrapper>
      <!-- Navigation -->
      <nav class="flex gap-4 text-sm text-blue-600 mb-4">
        <button routerLink="/dev" class="hover:underline">← Dev index</button>
        <button routerLink="/" class="hover:underline">Accueil</button>
      </nav>

      <h2 class="text-3xl font-semibold text-gray-900 mb-4">/api/me/ & PATCH /api/me/</h2>

      <!-- Action Buttons -->
      <div class="flex gap-4 mb-4">
        <button
          class="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white
                 shadow-sm hover:bg-blue-700 transition-all duration-200"
          (click)="loadProfile()"
        >
          GET /api/me/
        </button>
        <button
          class="flex-1 rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white
                 shadow-sm hover:bg-emerald-700 transition-all duration-200"
          (click)="updateProfile()"
        >
          PATCH /api/me/
        </button>
      </div>

      <!-- Profile Response -->
      <div *ngIf="profile()" class="mt-6">
        <h3 class="text-lg font-medium text-gray-900">Profile Data</h3>
        <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-x-auto">
          {{ profile() | json }}
        </pre>
      </div>

      <!-- Error Message -->
      <div *ngIf="err()" class="mt-4 text-red-600 font-medium">
        {{ err() }}
      </div>
    </app-page-wrapper>
  `,
})
export class DevAccountsComponent {
  readonly profile = signal<User | null>(null);
  readonly err = signal<string | null>(null);

  async loadProfile(): Promise<void> {
    this.err.set(null);
    this.profile.set(null);
    const res = await fetch('/api/me/');
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as User;
    this.profile.set(data);
  }

  async updateProfile(): Promise<void> {
    this.err.set(null);
    this.profile.set(null);
    const res = await fetch('/api/me/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Demo User', preferences: { newsletter: true } }),
    });
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as User;
    this.profile.set(data);
  }
}
