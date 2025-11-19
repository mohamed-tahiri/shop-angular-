import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Nom d'utilisateur</mat-label>
        <input matInput formControlName="username" placeholder="Entrez votre nom d'utilisateur"/>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Mot de passe</mat-label>
        <input matInput type="password" formControlName="password" placeholder="Entrez votre mot de passe"/>
      </mat-form-field>

      <div *ngIf="error" class="text-red-600 text-sm text-center">{{ error }}</div>

      <button
        mat-raised-button
        color="primary"
        type="submit"
        class="w-full flex justify-center items-center gap-2"
        [disabled]="loading"
      >
        <ng-container *ngIf="!loading">Se connecter</ng-container>
        <ng-container *ngIf="loading">
          <mat-progress-spinner
            mode="indeterminate"
            diameter="20"
            color="accent"
          ></mat-progress-spinner>
        </ng-container>
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();
  @Input() loading = false;
  @Input() error: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['demo'],
      password: ['demo'],
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
