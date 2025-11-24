import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-container',
  imports: [RouterModule],
  templateUrl: './clickable-container.component.html',
})
export class ClickableContainerComponent {
  @Input() link: string = '/';
}
