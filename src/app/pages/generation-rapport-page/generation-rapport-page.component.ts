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
import { FormsModule } from '@angular/forms';

interface FormData {
  droite: EyesTear;
  gauche: EyesTear;
}

@Component({
    selector: 'app-generation-rapport-page',
    imports: [
        LateralNavbarComponent,
        TopBarComponent,
        CommonModule,
        RouterLink,
        HttpClientModule,
        FormsModule
    ],
    templateUrl: './generation-rapport-page.component.html'
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

  //   // Ajouter un logo
  // const logoUrl = '../../../../public/assets/logo.png'; // Remplace par le chemin de ton logo
  // const imgData = ''; // Tu peux charger ton image ici en base64 ou utiliser une URL
  // // Charger et ajouter le logo (dimension du logo ajustée selon les besoins)
  // doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
  // Titre du document
  doc.setFontSize(16);
  doc.text('Rapport de Prise en Charge', 50, 20);

  // Informations Mutuelle et Tiers Payant (Exemple)
  doc.setFontSize(12);
  doc.text('Mutuelle: Nom de la Mutuelle', 10, 50);
  doc.text('Numéro de contrat: 123456789', 10, 60);
  doc.text('Date: ' + new Date().toLocaleDateString(), 150, 50);
  doc.text('Référence Tiers Payant: 987654321', 150, 60);

    // Tableau récapitulatif des données
    autoTable(doc, {
      head: [['Oeil', 'Diamètre', 'Rayon', 'Puissance X', 'Puissance Y', 'Puissance Z']],
      body: [
        [
          'Gauche', 
          this.eyeDataLeft.diametre, 
          this.eyeDataLeft.rayon, 
          this.eyeDataLeft.puissance.x, 
          this.eyeDataLeft.puissance.y, 
          this.eyeDataLeft.puissance.z
        ],
        [
          'Droit', 
          this.eyeDataRight.diametre, 
          this.eyeDataRight.rayon, 
          this.eyeDataRight.puissance.x, 
          this.eyeDataRight.puissance.y, 
          this.eyeDataRight.puissance.z
        ],
      ],
      startY: 80
    });

    autoTable(doc, {
      head: [['Oeil', 'PSC', 'Tonus', 'Hauteur Prisme', 'Grade Lipide', 'Charge Lacrimale']],
      body: [
        [
          'Gauche',
          this.eyesTear.gauche.psc,
          this.eyesTear.gauche.tonus,
          this.eyesTear.gauche.hauteurPrisme,
          this.eyesTear.gauche.gradeLipide,
          this.eyesTear.gauche.chargeLacrimale
        ],
        [
          'Droit',
          this.eyesTear.droite.psc,
          this.eyesTear.droite.tonus,
          this.eyesTear.droite.hauteurPrisme,
          this.eyesTear.droite.gradeLipide,
          this.eyesTear.droite.chargeLacrimale
        ],
      ],
      startY:  140 
    });

    doc.addPage(); 
    doc.setFontSize(16);

    const pageWidth = doc.internal.pageSize.getWidth(); 
    doc.text("Adaptation lentille de contact", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text('Magasin: [...]', 20, 40);
    doc.text('Adresse : [...]', 20, 45);
    doc.text('Par : [...]', 20, 50);
    doc.text('Fait le : ' + new Date().toLocaleDateString(), 150, 55);
    doc.text('A : [...]', 150, 60);
    doc.text('Porteur: [...]', 20, 65);
    doc.text('Age : [...]', 20, 70);

    autoTable(doc, {
      head: [['Oeil', 'Droit', 'Gauche']],
      body: [
        [
          'Information', 
          '[...]', 
          '[...]'
        ],
        [
          'Résultat', 
          '[...]',
          '[...]'
        ],
      ],
      startY: 90,
      styles: {
        halign: 'center', // Centrage horizontal du texte dans les cellules
        valign: 'middle', // Centrage vertical du texte dans les cellules
        lineWidth: 0.2, // Épaisseur des bordures
        lineColor: [0, 0, 0] // Couleur des bordures (noir)
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l'en-tête
        textColor: [255, 255, 255], // Texte en blanc
        halign: 'center',
        valign: 'middle',
        fontStyle: 'bold' // Texte en gras pour l'en-tête
      },
      bodyStyles: {
        textColor: 0, // Texte en noir
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220] // Gris très clair pour une ligne sur deux
      },
      columnStyles: {
        0: { halign: 'center' }, // Centrer la première colonne
        1: { halign: 'center' }, // Centrer la deuxième colonne
        2: { halign: 'center' }  // Centrer la troisième colonne
      }
    });
    
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptiX", pageWidth / 2, 287, { align: "center" });

    doc.addPage(); // Ajouter une nouvelle page
    doc.setFontSize(16);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0); // Noir

    doc.text("Compte Rendu", pageWidth / 2, 20, { align: "center" });

    // Informations Magasin (Exemple)
    doc.setFontSize(12);
    doc.text('Magasin: [...]', 20, 40);
    doc.text('Adresse : [...]', 20, 45);
    doc.text('Par : [...]', 20, 50);
    doc.text('Fait le : ' + new Date().toLocaleDateString(), 150, 55);
    doc.text('A : [...]', 150, 60);
    doc.text('Porteur: [...]', 20, 65);
    doc.text('Age : [...]', 20, 70);
    doc.text('Raison : [...]', 20, 75);

    autoTable(doc, {
      startY: 85, // ✅ Position du tableau fixée à 85
      head: [
        [
          { content: 'Intitulé', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' } },
          { content: 'Commentaire', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } }
        ],
        ['OD', 'OG']
      ],
      body: [
        ['Oeil directeur VL / VP', { content: '', colSpan: 2, styles: { halign: 'center' } }], // ✅ Fusion OD & OG
        ['Oeil dominant VL / VP', { content: '', colSpan: 2, styles: { halign: 'center' } }], // ✅ Fusion OD & OG
        ['Réfraction lentille', '', ''],
        ['PSC', '', ''],
        ['DHIV', '', ''],
        ['Diamètre pupillaire', '', ''],
        ['FP / Recouvrement', '', ''],
        ['Tonus', '', ''],
        ['Clignement', { content: '', colSpan: 2, styles: { halign: 'center' } }], // ✅ Fusion OD & OG
        ['Kératométrie', '', ''],
        ['Hauteur prisme de larmes', '', ''],
        ['Charge lacrymale', '', ''],
        ['Lipides', '', '']
      ],
      styles: {
        halign: 'center', // ✅ Centre tous les textes
        valign: 'middle',
        lineWidth: 0.5,
        lineColor: [0, 0, 0] // ✅ Bordures noires
      },
      headStyles: {
        fillColor: [0, 76, 153], // ✅ Bleu foncé pour l'en-tête
        textColor: [255, 255, 255], // ✅ Texte blanc
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // ✅ Fond gris clair une ligne sur deux
      },
      columnStyles: {
        0: { cellWidth: 50, halign: 'center', fontStyle: 'bold' }, // ✅ Largeur fixe à 50px pour "Intitulé"
        1: { halign: 'center', cellWidth: 65 }, // ✅ Largeur de 65px pour OD
        2: { halign: 'center', cellWidth: 65 }  // ✅ Largeur de 65px pour OG
      }
    });
    

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptiX", pageWidth / 2, 287, { align: "center" });

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
