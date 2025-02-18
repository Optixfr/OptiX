import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-tears-eyes',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './form-tears-eyes.component.html',
})

export class FormTearsEyesComponent implements OnInit {
  @Input() nomFormulaire = '';

  eyesTear!: EyesTear;

  constructor(
    @Inject(FormTearsEyesDataService)
    private formSizeEyesDataService: FormTearsEyesDataService
  ) {}

  ngOnInit() {
    if (
      this.nomFormulaire.includes('Droit') &&
      this.nomFormulaire.includes('Gauche')
    ) {
      this.eyesTear = this.formSizeEyesDataService.getFormData().droite;
    } else if (this.nomFormulaire.includes('Gauche')) {
      this.eyesTear = this.formSizeEyesDataService.getFormData().gauche;
    } else {
      this.eyesTear = this.formSizeEyesDataService.getFormData().droite;
    }
  }

  submitted = false;

  getFormData(): EyesTear {
    return this.eyesTear;
  }
}
