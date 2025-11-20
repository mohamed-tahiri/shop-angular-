import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Imports Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'; // Ajouté pour être sûr

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();
  @Input() loading = false;
  @Input() error: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Ajout de Validators.required pour que le formulaire soit invalide si vide
    this.form = this.fb.group({
      username: ['demo', [Validators.required]],
      password: ['demo', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}