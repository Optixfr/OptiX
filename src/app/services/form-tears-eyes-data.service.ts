import { Injectable } from '@angular/core';
import { EyesTear } from '../models/eyes-tear.model';

@Injectable({
  providedIn: 'root'
})
export class FormTearsEyesDataService {

  private formData: EyesTear[] = [
    {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: ''
    },
    {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: ''
    }
    ];
  
    getFormData(): EyesTear[] {
      return this.formData;
    }
  
    setFormData(data: EyesTear[]): void {
      this.formData = data;
    }
}
