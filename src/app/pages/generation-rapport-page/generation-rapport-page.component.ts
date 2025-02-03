import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormSizeEyesDataService } from '../../services/form-size-eyes-data.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EyesCalculationService } from '../../services/eyes-calculation.service';
import { Subscription } from 'rxjs';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';

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

  eyesTear: EyesTear[] = [];

  constructor(
    private formSizeEyesDataService: FormSizeEyesDataService,
    private formTearEyesDataService: FormTearsEyesDataService,
    private sanitizer: DomSanitizer,
    private eyesCalculationService: EyesCalculationService,
    private eyesTearService: FormTearsEyesDataService
  ) {}

  ngOnInit() {
    const formSizeData = this.formSizeEyesDataService.getFormData();
    const formTearData = this.formTearEyesDataService.getFormData();

    const formattedData = this.formatDataForAPI(formSizeData, formTearData);

    console.log(formattedData);

    this.dataSubscription = this.eyesCalculationService
      .sendData(formattedData)
      .subscribe((result: any) => {
        this.eyeDataLeft = result.eye_o_gauche;
        this.eyeDataRight = result.eye_o_droite;
        this.generatePDF();
      });

    this.eyesTear = this.eyesTearService.getFormData();
    this.generatePDF();
  }

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

    // Tableau récapitulatif des données
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
          this.eyesTear[0].psc,
          this.eyesTear[0].tonus,
          this.eyesTear[0].hauteurPrisme,
          this.eyesTear[0].gradeLipide,
          this.eyesTear[0].chargeLacrimale,
        ],
        [
          this.eyesTear[1].psc,
          this.eyesTear[1].tonus,
          this.eyesTear[1].hauteurPrisme,
          this.eyesTear[1].gradeLipide,
          this.eyesTear[1].chargeLacrimale,
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
