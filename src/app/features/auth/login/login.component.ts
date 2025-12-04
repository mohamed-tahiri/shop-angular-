import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from '../../../state/auth/auth.actions';
import * as AuthSelectors from '../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card'; // <-- CE MODULE MANQUAIT
import { MatButtonModule } from '@angular/material/button';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [LoginFormComponent, CommonModule, MatCardModule, MatButtonModule, PageWrapperComponent],
  templateUrl: './login.component.html',
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
        tap(() => this.router.navigate(['/shop/products']))
      )
      .subscribe();
  }

  onSubmit(payload: { username: string; password: string }) {
    this.store.dispatch(AuthActions.login(payload));
  }
}
