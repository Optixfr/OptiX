import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { CommonModule } from '@angular/common';
import { FormSizeEyesDataService } from '../../services/form-size-eyes-data.service';

@Component({
  selector: 'app-form-eye-size',
  standalone: true,
  imports: [FormsModule, CommonModule, ],
  templateUrl: './form-eye-size.component.html',
  styleUrl: './form-eye-size.component.css',
})
export class FormEyeSizeComponent implements OnInit {
  @Input() nomFormulaire = '';

  eyeMeasure: EyeMeasure = {
    xl: '',
    yl: '',
    zl: '',
    dhiv: '',
    diametre: '',
    recouvrement: '',
    k1: '',
    x: '',
    k2: '',
    y: '',
    excentricite: '',
  };

    // Injecter le service
    constructor(@Inject(FormSizeEyesDataService) private formSizeEyesDataService: FormSizeEyesDataService) {}

    ngOnInit() {
      console.log('Nom du formulaire :', this.nomFormulaire);
      if (this.nomFormulaire === 'Formulaire Oeil Gauche') {
        this.eyeMeasure = this.formSizeEyesDataService.getFormData()[0]; // Formulaire pour l'œil gauche
      } else if (this.nomFormulaire === 'Formulaire Oeil Droit') {
        this.eyeMeasure = this.formSizeEyesDataService.getFormData()[1]; // Formulaire pour l'œil droit
      }
    }

  submitted = false;

  getFormData(): EyeMeasure {
    return this.eyeMeasure;
  }
}
