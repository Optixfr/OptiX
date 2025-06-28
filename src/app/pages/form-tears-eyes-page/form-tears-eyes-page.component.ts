import { Component, QueryList, ViewChildren } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';
import { FormTearsEyesComponent } from '../../components/form-tears-eyes/form-tears-eyes.component';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-tears-eyes-page',
    imports: [HttpClientModule, FormTearsEyesComponent, FormsModule, RouterLink], // Importer HttpClientModule ici
    providers: [EyesCalculationService],
    templateUrl: './form-tears-eyes-page.component.html'
})

export class FormTearsEyesPageComponent {
  commentaire = '';
  isDuplicatedForm = false;

  @ViewChildren(FormTearsEyesComponent) forms!: QueryList<FormTearsEyesComponent>; 

  constructor(private formDataService: FormTearsEyesDataService, private router: Router) {}

  submitForms() {
    const formData = this.forms.map((form) => form.getFormData());
    this.formDataService.setFormData(formData);
    this.formDataService.setCommentaire(this.commentaire);
    this.sendDataToBackend();    
    this.router.navigate(['/report-generation']);
  }

  sendDataToBackend() {
    const formData = this.forms.map((form) => form.getFormData()); 
    this.formDataService.setFormData(formData);
  }

  getCommentaire() {
    return this.commentaire;
  }

  addSideForm(): void {
    this.isDuplicatedForm = true;
    this.formDataService.duplicateRightForm();
  }
}