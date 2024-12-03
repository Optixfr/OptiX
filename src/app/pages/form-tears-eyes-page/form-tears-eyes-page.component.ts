import { Component } from '@angular/core';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { RouterLink } from '@angular/router';
import { FormTearsEyesComponent } from "../../components/form-tears-eyes/form-tears-eyes.component";

@Component({
  selector: 'app-form-tears-eyes-page',
  standalone: true,
  imports: [FormEyeSizeComponent, LateralNavbarComponent, TopBarComponent, FormTearsEyesComponent, RouterLink],
  templateUrl: './form-tears-eyes-page.component.html',
  styleUrl: './form-tears-eyes-page.component.css'
})

export class FormTearsEyesPageComponent {

}
