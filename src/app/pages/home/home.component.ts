import { Component, signal } from '@angular/core';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { ClickableContainerComponent } from '../../shared/components/UI/clickable-container/clickable-container.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [PageWrapperComponent, ClickableContainerComponent],
  template: `
  <app-page-wrapper>
    <div class="space-y-3 mb-10">
      <h1 class="text-4xl font-semibold tracking-tight text-gray-900">
        Bienvenue sur <span class="text-black">My Shop</span>
      </h1>
      <p class="text-gray-500 text-lg">Choisis une zone pour continuer</p>
    </div>

    <div class="grid sm:grid-cols-3 gap-6 mb-16">
      <app-container link="/dev" class="cursor-pointer">
        <h2 class="text-lg font-medium text-gray-900">Zone de test MSW</h2>
        <p class="text-gray-500 text-sm mt-1">
          Espace de développement et simulations d'API.
        </p>
      </app-container>

      <app-container link="/admin/dashboard" class="cursor-pointer">
        <h2 class="text-lg font-medium text-gray-900">Partie admin</h2>
        <p class="text-gray-500 text-sm mt-1">
          Espace de l'administrateur.
        </p>
      </app-container>

      <app-container link="/login" class="cursor-pointer">
        <h2 class="text-lg font-medium text-gray-900">Accéder à l’app</h2>
        <p class="text-gray-500 text-sm mt-1">
          Version placeholder de l’application principale.
        </p>
      </app-container>
      
    </div>

    <!-- Section présentation développeur avec liens -->
    <div class="border-t pt-8 text-center space-y-3">
      <h3 class="text-xl font-semibold text-gray-900">
        Mohamed Tahiri
      </h3>
      <p class="text-gray-500">
        Développeur Full-Stack — Php · JS/TS · JAVA · AWS
      </p>

      <!-- Liens GitHub / LinkedIn -->
      <div class="flex justify-center gap-6 mt-2">
        <a
          href="https://github.com/mohamed-tahiri"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="GitHub"
        >
          <!-- GitHub Icon (SVG) -->
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73
              1.205.085 1.838 1.24 1.838 1.24 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.933
              0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404
              11.5 11.5 0 013.003.404c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22
              0 4.61-2.807 5.63-5.48 5.924.43.37.823 1.096.823 2.21 0 1.595-.015 2.883-.015 3.275 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12
              24 5.37 18.63 0 12 0z"
            />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/mohamed-tahiri-4a24291a5/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="LinkedIn"
        >
          <!-- LinkedIn Icon (SVG) -->
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762
              0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966
              0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75
              1.75zm13.5 11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5
              2.5v5.5h-3v-10h3v1.354c.727-1.086 2.065-1.854 3.5-1.854 2.481 0 4.5
              2.019 4.5 4.5v6z"
            />
          </svg>
        </a>
      </div>
    </div>
  </app-page-wrapper>
  `,
})
export class HomeComponent {
  protected readonly title = signal('my-shop');
}
