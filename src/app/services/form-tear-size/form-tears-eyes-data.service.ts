import { Injectable } from '@angular/core';
import { EyesTear } from '../../models/eyes-tear.model';

interface FormData {
  droite: EyesTear;
  gauche: EyesTear;
}

@Injectable({
  providedIn: 'root',
})
export class FormTearsEyesDataService {
  private formData: FormData = {
    droite: {
      psc: 'standard',
      tonus: 'standard',
      hauteurPrisme: 'standard',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    },
    gauche: {
      psc: 'standard',
      tonus: 'standard',
      hauteurPrisme: 'standard',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    }
  }

  getFormData(): FormData {
    return this.formData;
  }

  setFormData(data: EyesTear[]): void {

    if (data.length >= 2) {
      this.formData = {
        droite: data[0],
        gauche: data[1],
      };
    }
  }
}
