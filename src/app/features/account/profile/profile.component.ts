import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PageWrapperComponent } from "../../../shared/components/UI/page-wrappe/page-wrapper.component";
import { User } from "../../../../mocks/user";

import * as UserSelectors from "../../../state/user/user.selectors";
import * as UserActions from "../../../state/user/user.actions";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable } from "rxjs";

@Component({
  selector: 'profile-page',
  standalone: true,
  imports: [PageWrapperComponent, CommonModule, FormsModule, MatProgressSpinnerModule],
  template: `
  <app-page-wrapper>

  <h2 class="text-2xl font-bold mb-6">Profil utilisateur</h2>

  <!-- Bloc principal -->
  <ng-container *ngIf="!(loading$ | async); else loading">

    <div *ngIf="userCopy" class="bg-white p-6 rounded-xl shadow-md space-y-6">

      <!-- Infos utilisateur -->
      <div class="space-y-4">
        
        <div class="flex flex-col">
          <label class="font-medium text-gray-700 mb-1">Nom complet</label>
          <input 
            type="text" 
            [(ngModel)]="userCopy.fullName"
            class="border rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          >
        </div>

        <div class="flex flex-col">
          <label class="font-medium text-gray-700 mb-1">Username</label>
          <input 
            type="text" 
            [(ngModel)]="userCopy.username"
            class="border rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          >
        </div>

        <div class="flex flex-col">
          <label class="font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            [(ngModel)]="userCopy.email"
            class="border rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          >
        </div>

      </div>

      <!-- Préférences -->
      <div class="space-y-4 border-t pt-4">

        <label class="flex items-center gap-3 text-gray-700">
          <input 
            type="checkbox" 
            [(ngModel)]="userCopy.preferences.newsletter"
            class="w-5 h-5 rounded border-gray-300"
          >
          Recevoir la newsletter
        </label>

        <div class="flex flex-col">
          <label class="font-medium text-gray-700 mb-1">
            Note minimale par défaut
          </label>
          <input 
            type="number" 
            [(ngModel)]="userCopy.preferences.defaultMinRating"
            class="border rounded-lg px-3 py-2 w-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
          >
        </div>

      </div>

      <!-- Actions -->
      <div class="flex gap-4 justify-end pt-4 border-t">
        <button 
          class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          (click)="saveProfile()"
        >
          Sauvegarder
        </button>

        <button 
          class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          (click)="resetProfile()"
        >
          Annuler
        </button>
      </div>

    </div>
  </ng-container>

  <!-- Loader -->
  <ng-template #loading>
  <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
  </ng-template>

  <!-- Errors -->
  <div *ngIf="error$ | async as error" class="text-red-600 mt-4">
    {{ error }}
  </div>

</app-page-wrapper>

  `
})
export class ProfilePageComponent implements OnInit {

  /** Correct types */
  user$!: Observable<User | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  /** Copy locale modifiable */
  userCopy: User = {} as User;

  private store = inject(Store);

  ngOnInit() {
    // 🟢 Sélection des données depuis NgRx
    this.user$ = this.store.select(UserSelectors.selectUser);
    this.loading$ = this.store.select(UserSelectors.selectUserLoading);
    this.error$ = this.store.select(UserSelectors.selectUserError);

    // 🟢 Charger l'utilisateur depuis l'API (NgRx effect)
    this.store.dispatch(UserActions.loadUser());

    this.user$.subscribe(user => {
      if (user) {
        this.userCopy = structuredClone(user);
      }
    });
  }

  /** 🟦 Enregistrer */
  saveProfile() {
    this.store.dispatch(UserActions.updateUser({ user: this.userCopy }));
  }

  /** 🟧 Annuler */
  resetProfile() {
    this.user$.subscribe(user => {
      if (user) this.userCopy = structuredClone(user);
    });
  }
}
