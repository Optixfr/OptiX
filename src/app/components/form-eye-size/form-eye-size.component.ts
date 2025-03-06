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
}
