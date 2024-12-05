import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eye-measure.model';

@Component({
  selector: 'app-form-eye-size',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-eye-size.component.html',
  styleUrl: './form-eye-size.component.css'
})
export class FormEyeSizeComponent {
  @Input() nomFormulaire: string = '';

  eyeMeasure: EyeMeasure;  
  submitted = false;

  constructor() {
    this.eyeMeasure = new EyeMeasure('', '');
  }

  onSubmit() {
    console.log('Formulaire soumis :', this.eyeMeasure);
    this.submitted = true;
  }
}
