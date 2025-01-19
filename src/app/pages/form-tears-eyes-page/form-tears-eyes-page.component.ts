import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { Router, RouterLink } from '@angular/router';
import { FormTearsEyesComponent } from "../../components/form-tears-eyes/form-tears-eyes.component";
import {FormTearsEyesDataService} from "../../services/form-tears-eyes-data.service"

@Component({
  selector: 'app-form-tears-eyes-page',
  standalone: true,
  imports: [LateralNavbarComponent, TopBarComponent, FormTearsEyesComponent, RouterLink],
  templateUrl: './form-tears-eyes-page.component.html',
  styleUrl: './form-tears-eyes-page.component.css'
})

export class FormTearsEyesPageComponent {
@ViewChildren(FormTearsEyesComponent) forms!: QueryList<FormTearsEyesComponent>; 

  constructor(private formDataService: FormTearsEyesDataService, private router: Router) {}

  submitForms() {
    const formData = this.forms.map((form) => form.getFormData()); 
    console.log('Données des formulaires :', formData);
    this.formDataService.setFormData(formData);
  } 
}
