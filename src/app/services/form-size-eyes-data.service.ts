import { Injectable } from '@angular/core';
import { EyeMeasure } from '../models/eyes-measure.model';

@Injectable({
  providedIn: 'root'
})
export class FormSizeEyesDataService {
  private formData: EyeMeasure[] = [
    {
      xl: '',
      yl: '',
      zl: '',
      dhiv: '',
      diametre: '',
      recouvrement: '',
      k1: '',
      x: '',
      k2: '',
      y: '',
      excentricite: ''
    },
    {
      xl: '',
      yl: '',
      zl: '',
      dhiv: '',
      diametre: '',
      recouvrement: '',
      k1: '',
      x: '',
      k2: '',
      y: '',
      excentricite: ''
    }
  ];

  getFormData(): EyeMeasure[] {
    return this.formData;
  }

  setFormData(data: EyeMeasure[]): void {
    this.formData = data;
  }
}
