import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { CommonModule } from '@angular/common';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';

@Component({
    selector: 'app-form-eye-size',
    imports: [FormsModule, CommonModule],
    templateUrl: './form-eye-size.component.html'
})
export class FormEyeSizeComponent implements OnInit {
  @Input() nomFormulaire = '';

  eyeMeasure!: EyeMeasure;

  constructor(
    @Inject(FormSizeEyesDataService)
    private formSizeEyesDataService: FormSizeEyesDataService
  ) {}

  ngOnInit() {
    if (
      this.nomFormulaire.includes('Droit') &&
      this.nomFormulaire.includes('Gauche')
    ) {
      // Cas où on duplique l'œil droit sur l'œil gauche
      this.eyeMeasure = this.formSizeEyesDataService.getFormData().droite;
    } else if (this.nomFormulaire.includes('Gauche')) {
      this.eyeMeasure = this.formSizeEyesDataService.getFormData().gauche;
    } else {
      this.eyeMeasure = this.formSizeEyesDataService.getFormData().droite;
    }
  }

  submitted = false;

  getFormData(): EyeMeasure {
    return this.eyeMeasure;
  }
  
  // Temporary
  fillTest2() {
    const formDataTest2: EyeMeasure = {
        sphere: '5',
        cylindre: '-1.25',
        axe: '100',
        dhiv: '12',
        dvo: '11',
        k1: '8.05',
        x: '100',
        k2: '7.8',
        y: '10',
        excentricite: '0.65',
      }
    this.eyeMeasure = formDataTest2;
  }
  
  fillTest1() {
    const formDataTest1: EyeMeasure = {
        sphere: '-8',
        cylindre: '-3',
        axe: '10',
        dhiv: '12',
        dvo: '11',
        k1: '7.8',
        x: '10',
        k2: '7.3',
        y: '100',
        excentricite: '0.3',
      }
    this.eyeMeasure = formDataTest1;
  }
}
