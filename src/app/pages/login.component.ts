import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from '../state/auth/auth.actions';
import * as AuthSelectors from '../state/auth/auth.selectors';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [LoginFormComponent, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <!-- <div class="flex justify-center mb-6">
          <img src="assets/logo.png" alt="Logo" class="h-16 w-16 object-contain">
        </div> -->

        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Connexion</h1>

        <app-login-form
          (submitForm)="onSubmit($event)"
          [loading]="(loading$ | async) ?? false"
          [error]="error$ | async"
        ></app-login-form>
      </div>
    </div>
  `,
})
export class LoginPageComponent {
  private store = inject(Store);
  private router = inject(Router);

  loading$: Observable<boolean> = this.store.select(AuthSelectors.selectAuthLoading);
  error$: Observable<string | null> = this.store.select(AuthSelectors.selectAuthError);

  constructor() {
    this.store.select(AuthSelectors.selectIsLoggedIn)
      .pipe(
        filter(loggedIn => loggedIn === true),
        tap(() => this.router.navigate(['/app/shop/products']))
      )
      .subscribe();
  }

  onSubmit(payload: { username: string; password: string }) {
    this.store.dispatch(AuthActions.login(payload));
  }
}
