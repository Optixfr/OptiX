import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-form-tears-eyes',
    standalone: true,
    imports: [FormsModule, HttpClientModule],
    templateUrl: './form-tears-eyes.component.html'
})
export class FormTearsEyesComponent implements OnInit {
  readonly nomFormulaire = input.required<string>();
  private formSizeEyesDataService = inject(FormTearsEyesDataService);

  eyesTear!: EyesTear;
  submitted = false;

  ngOnInit() {
    const formName = this.nomFormulaire();
    if (formName.includes('Droit') && formName.includes('Gauche')) {
      this.eyesTear = this.formSizeEyesDataService.getFormData().droite;
    } else if (formName.includes('Gauche')) {
      this.eyesTear = this.formSizeEyesDataService.getFormData().gauche;
    } else {
      this.eyesTear = this.formSizeEyesDataService.getFormData().droite;
    }
  }

  getFormData(): EyesTear {
    return this.eyesTear;
  }
}
