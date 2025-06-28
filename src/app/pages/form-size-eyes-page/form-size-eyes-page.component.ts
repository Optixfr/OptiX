import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { Router, RouterLink } from '@angular/router';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';

@Component({
    selector: 'app-form-size-eyes-page',
    imports: [
        FormEyeSizeComponent,
        RouterLink,
    ],
    templateUrl: './form-size-eyes-page.component.html'
})
export class FormSizeEyesPageComponent {
  isDuplicatedForm = false;
  
  @ViewChildren(FormEyeSizeComponent) forms!: QueryList<FormEyeSizeComponent>; 

  constructor(private formDataService: FormSizeEyesDataService, private router: Router) {}

  submitForms() {
    const formData = this.forms.map((form) => form.getFormData()); 
    this.formDataService.setFormData(formData);
  } 
  
  addSideForm(): void {
    this.isDuplicatedForm = true;
    this.formDataService.duplicateRightForm();
  }
}
