import { Component } from '@angular/core';
import { ToolCardComponent } from "../../components/tool-card/tool-card.component";

@Component({
  selector: 'app-tool-page',
  imports: [ToolCardComponent],
  templateUrl: './tool-page.component.html',
})
export class ToolPageComponent {
  cards = [
    {
      title: 'Lentilles rigides',
      description: 'Outil de traitement des lentilles rigides',
      link: '/accueil'
    },
    {
      title: 'Lentilles souples',
      description: 'Outil de traitement des lentilles souples',
      link: 'https://source.unsplash.com/random/400x200?sig=2'
    },
  ];
}
