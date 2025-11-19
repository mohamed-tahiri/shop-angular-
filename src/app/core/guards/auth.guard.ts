import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { selectIsLoggedIn } from '../../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1), // on prend juste la valeur actuelle
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/app/login']); // redirection si non connecté
          return false;
        }
        return true;
      })
    );
  }
}
