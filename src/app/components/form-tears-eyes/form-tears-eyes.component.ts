import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear';

@Component({
  selector: 'app-form-tears-eyes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-tears-eyes.component.html',
  styleUrl: './form-tears-eyes.component.css'
})
export class FormTearsEyesComponent {
  @Input() nomFormulaire: string = '';

  eyesTear: EyesTear = {
    psc: '',
    tonus: '',
    hauteurPrisme: '',
    gradeLipide: undefined,
    chargeLacrimale: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.eyesTear);
    } else {
      console.log("Formulaire invalide");
    }
  }
}
