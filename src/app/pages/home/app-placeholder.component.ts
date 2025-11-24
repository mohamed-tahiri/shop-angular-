import { Component } from '@angular/core';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { ClickableContainerComponent } from '../../shared/components/UI/clickable-container/clickable-container.component';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [PageWrapperComponent, ClickableContainerComponent],
  template: `
  <app-page-wrapper>
      <!-- Title -->
      <h2 class="text-3xl font-semibold text-gray-900">App Shop — Placeholder</h2>

      <!-- Navigation Buttons -->
      <nav class="grid gap-4 mt-6">
        <app-container
          link="/dev"
        >
         → Aller à la zone de tests
        </app-container>
        <app-container
          link="/app/login"
        >
          → Aller à la page de login de l’application
        </app-container>
        <app-container
          link="/"
        >
          ← Retour accueil
        </app-container>
      </nav>
  </app-page-wrapper>
  `,
})
export class AppPlaceholderComponent {}
