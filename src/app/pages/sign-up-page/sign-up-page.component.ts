import { Component } from '@angular/core';
import { ConnexionFormComponent } from "../../components/connexion-form/connexion-form.component";

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [ConnexionFormComponent],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

}
