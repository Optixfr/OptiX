import { Component, OnInit, OnDestroy } from '@angular/core';
import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';
import { Subscription } from 'rxjs';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';

interface FormData {
  droite: EyesTear;
  gauche: EyesTear;
}

@Component({
  selector: 'app-generation-rapport-page',
  standalone: true,
  imports: [
    LateralNavbarComponent,
    TopBarComponent,
    CommonModule,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './generation-rapport-page.component.html',
  styleUrl: './generation-rapport-page.component.css',
})
export class GenerationRapportPageComponent implements OnInit, OnDestroy {
  pdfUrl: SafeResourceUrl | undefined;
  eyeDataLeft: any;
  eyeDataRight: any;
  dataSubscription: Subscription | undefined;

  eyesTear: FormData = {
    droite: {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: ''
    },
    gauche: {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: ''
    }
  };
  
  constructor(
    private formSizeEyesDataService: FormSizeEyesDataService,
    private formTearEyesDataService: FormTearsEyesDataService,
    private sanitizer: DomSanitizer,
    private eyesCalculationService: EyesCalculationService,
    private eyesTearService: FormTearsEyesDataService
  ) {}

  ngOnInit() {
    const formDataMeasure = this.formSizeEyesDataService.getFormData()
    const formDataTear = this.eyesTearService.getFormData()

    const transformValuesToNumber = (obj: any) => 
      Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, Number(value)]));

    const transformedData = {
      eye_m_droite: transformValuesToNumber(formDataMeasure.droite), 
      eye_m_gauche: transformValuesToNumber(formDataMeasure.gauche),
      eye_t_droite: formDataTear.droite,
      eye_t_gauche: formDataTear.gauche
    };


    this.dataSubscription = this.eyesCalculationService.sendData(transformedData).subscribe(
      (result: any) => {
        this.eyeDataLeft = result.eye_o_gauche;
        this.eyeDataRight = result.eye_o_droite;
        this.generatePDF();
      },
      (error) => {
        window.alert(error.error.error);
      }
    );

    this.eyesTear = this.eyesTearService.getFormData();
    this.generatePDF();
  }

  // Inutile --> supprimer ?
  private formatDataForAPI(eyeMeasures: any[], eyeTears: EyesTear[]) {
    return {
      eye_m_gauche: eyeMeasures[0],  
      eye_m_droite: eyeMeasures[1],  
      eye_t_gauche: eyeTears[0],     
      eye_t_droite: eyeTears[1]    
    };
  }

  ngOnDestroy() {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl as string);
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  generatePDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.setFontSize(16);
    doc.text('Rapport de Prise en Charge', 50, 20);

    doc.setFontSize(12);
    doc.text('Mutuelle: Nom de la Mutuelle', 10, 50);
    doc.text('Numéro de contrat: 123456789', 10, 60);
    doc.text('Date: ' + new Date().toLocaleDateString(), 150, 50);
    doc.text('Référence Tiers Payant: 987654321', 150, 60);

    autoTable(doc, {
      head: [
        [
          'Oeil',
          'Diamètre',
          'Rayon',
          'Puissance X',
          'Puissance Y',
          'Puissance Z',
        ],
      ],
      body: [
        [
          'Gauche',
          this.eyeDataLeft.diametre,
          this.eyeDataLeft.rayon,
          this.eyeDataLeft.puissance.x,
          this.eyeDataLeft.puissance.y,
          this.eyeDataLeft.puissance.z,
        ],
        [
          'Droit',
          this.eyeDataRight.diametre,
          this.eyeDataRight.rayon,
          this.eyeDataRight.puissance.x,
          this.eyeDataRight.puissance.y,
          this.eyeDataRight.puissance.z,
        ],
      ],
      startY: 80,
    });

    autoTable(doc, {
      head: [
        ['PSC', 'Tonus', 'Hauteur Prisme', 'Grade Lipide', 'Charge Lacrimale'],
      ],
      body: [
        [
          this.eyesTear.droite.psc,
          this.eyesTear.droite.tonus,
          this.eyesTear.droite.hauteurPrisme,
          this.eyesTear.droite.gradeLipide,
          this.eyesTear.droite.chargeLacrimale,
        ],
        [
          this.eyesTear.droite.psc,
          this.eyesTear.droite.tonus,
          this.eyesTear.droite.hauteurPrisme,
          this.eyesTear.droite.gradeLipide,
          this.eyesTear.droite.chargeLacrimale,
        ],
      ],
      startY: 140,
    });

    const pdfBlob = doc.output('blob');

    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  downloadPDF(): void {
    if (this.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.pdfUrl as string;
      link.download = 'form-data-preview.pdf';
      link.click();

      URL.revokeObjectURL(this.pdfUrl as string);
    }
  }
}
