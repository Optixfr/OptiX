import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-tears-eyes',
  standalone: true,
  imports: [FormsModule, HttpClientModule ],
  templateUrl: './form-tears-eyes.component.html',
  styleUrl: './form-tears-eyes.component.css'
})
export class FormTearsEyesComponent implements OnInit {
  @Input() nomFormulaire = '';

  eyesTear: EyesTear = {
    psc: 'standard',
    tonus: 'standard',
    hauteurPrisme: 'standard',
    gradeLipide: 'standard',
    chargeLacrimale: 'standard'
  };

  // Injecter le service
      constructor(@Inject(FormTearsEyesDataService) private formSizeEyesDataService: FormTearsEyesDataService) {}
  
      ngOnInit() {
        if (this.nomFormulaire === 'Formulaire Oeil Gauche') {
          this.eyesTear = this.formSizeEyesDataService.getFormData().gauche; // Formulaire pour l'œil gauche
        } else if (this.nomFormulaire === 'Formulaire Oeil Droit') {
          this.eyesTear = this.formSizeEyesDataService.getFormData().droite; // Formulaire pour l'œil droit
        }
      }
  
    submitted = false;
  
    getFormData(): EyesTear {
      return this.eyesTear;
    }
}
