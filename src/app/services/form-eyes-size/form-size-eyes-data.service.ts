import { Injectable } from '@angular/core';
import { EyeMeasure } from '../../models/eyes-measure.model';

interface FormData {
  droite: EyeMeasure;
  gauche: EyeMeasure;
}

@Injectable({
  providedIn: 'root'
})
export class FormSizeEyesDataService {
  private formData: FormData = {
    droite: {
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
    },
    gauche: {
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
    },
  };

  getFormData(): FormData {
    return { ...this.formData };
  }

  setFormData(data: EyeMeasure[]): void {
    this.duplicateRightForm();
    if (data.length >= 2) {
      this.formData = {
        droite: data[0],
        gauche: data[1],
      };
    }
  }
  
  duplicateRightForm() {
    this.formData.gauche = structuredClone(this.formData.droite);
  }
}