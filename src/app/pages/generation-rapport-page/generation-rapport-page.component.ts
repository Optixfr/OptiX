import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { FormSizeEyesDataService } from '../../services/form-size-eyes-data.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-generation-rapport-page',
  standalone: true,
  imports: [
    LateralNavbarComponent,
    TopBarComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './generation-rapport-page.component.html',
  styleUrl: './generation-rapport-page.component.css',
})
export class GenerationRapportPageComponent implements OnInit, OnDestroy {
  pdfUrl: SafeResourceUrl | undefined;

  eyeDataLeft: EyeMeasure = {
    xl: 'sasxcsdcsc',
    yl: '',
    zl: '',
    dhiv: '',
    diametre: '',
    recouvrement: '',
    k1: '',
    x: '',
    k2: '',
    y: '',
    excentricite: '',
  };

  eyeDataRight: EyeMeasure = {
    xl: '',
    yl: 'qsdcsdcsdcsd',
    zl: '',
    dhiv: '',
    diametre: '',
    recouvrement: '',
    k1: '',
    x: 'qsdcdccsdc',
    k2: '',
    y: '',
    excentricite: '',
  };

  constructor(
    @Inject(FormSizeEyesDataService)
    private formSizeEyesDataService: FormSizeEyesDataService,
    private sanitizer: DomSanitizer // Injection du service DomSanitizer
  ) {}

  ngOnInit() {
    const formData = this.formSizeEyesDataService.getFormData();
    this.generatePDF();
  }

  ngOnDestroy() {
    // Nettoyer l'URL temporaire pour éviter les fuites mémoire
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl as string);
    }
  }

  generatePDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Prévisualisation des Données', 10, 10);

    doc.setFontSize(12);
    doc.text('Oeil Gauche', 10, 20);
    doc.text(`XL: ${this.eyeDataLeft.xl}`, 10, 30);
    doc.text(`YL: ${this.eyeDataLeft.yl}`, 10, 40);
    doc.text(`ZL: ${this.eyeDataLeft.zl}`, 10, 50);
    doc.text(`DHIV: ${this.eyeDataLeft.dhiv}`, 10, 60);

    doc.text('Oeil Droit', 10, 80);
    doc.text(`XL: ${this.eyeDataRight.xl}`, 10, 90);
    doc.text(`YL: ${this.eyeDataRight.yl}`, 10, 100);
    doc.text(`ZL: ${this.eyeDataRight.zl}`, 10, 110);
    doc.text(`DHIV: ${this.eyeDataRight.dhiv}`, 10, 120);

    // Générer le PDF comme un Blob
    const pdfBlob = doc.output('blob');

    // Créer une URL temporaire pour le PDF et la marquer comme sûre
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
