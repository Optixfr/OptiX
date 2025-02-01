import { Component, QueryList, ViewChildren } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { EyesCalculationService } from '../../services/eyes-calculation.service';
import { FormTearsEyesComponent } from '../../components/form-tears-eyes/form-tears-eyes.component';
import { FormTearsEyesDataService } from '../../services/form-tears-eyes-data.service';
import { Router } from '@angular/router';
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-tears-eyes-page',
  standalone: true,
  imports: [HttpClientModule, FormTearsEyesComponent, TopBarComponent, LateralNavbarComponent, FormsModule], // Importer HttpClientModule ici
  providers: [EyesCalculationService],
  templateUrl: './form-tears-eyes-page.component.html',
  styleUrls: ['./form-tears-eyes-page.component.css']
})

export class FormTearsEyesPageComponent {
  commentaire: String = '';

  @ViewChildren(FormTearsEyesComponent) forms!: QueryList<FormTearsEyesComponent>; 

  constructor(private eyesService: EyesCalculationService, private formDataService: FormTearsEyesDataService, private router: Router) {}

  submitForms() {
    const formData = this.forms.map((form) => form.getFormData());  // TODO envoyer au denier formulaire
    console.log('Données des formulaires :', formData);
    this.formDataService.setFormData(formData);
    this.sendDataToBackend(formData);
    this.router.navigate(['/report-generation']);
  }

  sendDataToBackend(data: any) {
    const formData = this.forms.map((form) => form.getFormData()); 
    console.log('YYYYYOOOO Données des formulaires :', formData);
    this.formDataService.setFormData(formData);
  }
}