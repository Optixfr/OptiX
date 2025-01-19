import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tears-eyes-data.service';

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
    gradeLipide: '',
    chargeLacrimale: ''
  };

  // Injecter le service
      constructor(@Inject(FormTearsEyesDataService) private formSizeEyesDataService: FormTearsEyesDataService) {}
  
      ngOnInit() {
        console.log('Nom du formulaire :', this.nomFormulaire);
        if (this.nomFormulaire === 'Formulaire Oeil Gauche') {
          this.eyesTear = this.formSizeEyesDataService.getFormData()[0]; // Formulaire pour l'œil gauche
        } else if (this.nomFormulaire === 'Formulaire Oeil Droit') {
          this.eyesTear = this.formSizeEyesDataService.getFormData()[1]; // Formulaire pour l'œil droit
        }
      }
  
    submitted = false;
  
    getFormData(): EyesTear {
      return this.eyesTear;
    }


}
