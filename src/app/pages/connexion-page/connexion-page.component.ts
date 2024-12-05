import { Component } from '@angular/core';
import { ConnexionFormComponent } from "../../components/connexion-form/connexion-form.component";
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connexion-page',
  standalone: true,
  imports: [ConnexionFormComponent],
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.css'
})
export class ConnexionPageComponent {

}
