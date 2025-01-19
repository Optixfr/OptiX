import { Component, QueryList, ViewChildren } from '@angular/core';
import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { Router, RouterLink } from '@angular/router';
import { FormSizeEyesDataService } from '../../services/form-size-eyes-data.service';

@Component({
  selector: 'app-form-size-eyes-page',
  standalone: true,
  imports: [
    LateralNavbarComponent,
    TopBarComponent,
    FormEyeSizeComponent,
    RouterLink,
  ],
  templateUrl: './form-size-eyes-page.component.html',
  styleUrl: './form-size-eyes-page.component.css',
})
export class FormSizeEyesPageComponent {
  @ViewChildren(FormEyeSizeComponent) forms!: QueryList<FormEyeSizeComponent>; 

  constructor(private formDataService: FormSizeEyesDataService, private router: Router) {}

  submitForms() {
    const formData = this.forms.map((form) => form.getFormData()); 
    console.log('Données des formulaires :', formData);
    this.formDataService.setFormData(formData);
  } 
}
