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
      hauteurPrisme: '',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    },
    gauche: {
      psc: 'standard',
      tonus: 'standard',
      hauteurPrisme: '',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    }
  }
  
  private commentaire: string = '';

  getFormData(): FormData {
    return { ...this.formData };
  }

  setFormData(data: EyesTear[]): void {
    this.duplicateRightForm()
    if (data.length >= 2) {
      this.formData = {
        droite: data[0],
        gauche: data[1],
      };
    }
  }
  
  setCommentaire(commentaire: string) {
    this.commentaire = commentaire;
  }
  
  duplicateRightForm() {
    this.formData.gauche = structuredClone(this.formData.droite);
  }
  
  getCommentaire(): string {
    return this.commentaire;
  }
}
