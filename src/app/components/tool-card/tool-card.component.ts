import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-tool-card',
  imports: [RouterModule, RouterLink],
  templateUrl: './tool-card.component.html',
})
export class ToolCardComponent {
  @Input() title = 'Carte 1';
  @Input() description = 'Description 1';
  @Input() link = '/accueil';
}
