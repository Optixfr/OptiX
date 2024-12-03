import { Component } from '@angular/core';
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { FormTearsEyesComponent } from "../../components/form-tears-eyes/form-tears-eyes.component";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";

@Component({
  selector: 'app-generation-rapport-page',
  standalone: true,
  imports: [LateralNavbarComponent, FormTearsEyesComponent, TopBarComponent],
  templateUrl: './generation-rapport-page.component.html',
  styleUrl: './generation-rapport-page.component.css'
})
export class GenerationRapportPageComponent {

}
