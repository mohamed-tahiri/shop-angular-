import { Component, signal } from '@angular/core';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-shop');
}
