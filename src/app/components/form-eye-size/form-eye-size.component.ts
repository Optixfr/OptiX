import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { CommonModule } from '@angular/common';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';

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
    sphere: '0',
    cylindre: '0',
    axe: '0',
    dhiv: '0',
    dvo: '0',
    k1: '0',
    x: '0',
    k2: '0',
    y: '0',
    excentricite: '0',
  };

    // Injecter le service
    constructor(@Inject(FormSizeEyesDataService) private formSizeEyesDataService: FormSizeEyesDataService) {}

    ngOnInit() {
      if (this.nomFormulaire === 'Formulaire Oeil Gauche') {
        this.eyeMeasure = this.formSizeEyesDataService.getFormData().gauche;
      } else if (this.nomFormulaire === 'Formulaire Oeil Droit') {
        this.eyeMeasure = this.formSizeEyesDataService.getFormData().droite;
      }
    }

  submitted = false;

  getFormData(): EyeMeasure {
    return this.eyeMeasure;
  }
}
