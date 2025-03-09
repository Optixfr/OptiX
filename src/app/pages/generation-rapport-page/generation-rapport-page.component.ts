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
    FormsModule,
],
    templateUrl: './generation-rapport-page.component.html'
})
export class GenerationRapportPageComponent implements OnInit, OnDestroy {
  pdfUrl: SafeResourceUrl | undefined;
  pdfSettings: string = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&view=FitW';
  eyeDataLeft: any;
  eyeDataRight: any;
  dataSubscription: Subscription | undefined;
  pdfBlobounet: any;

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
    //private eyesCalculationService: EyesCalculationService,
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


    // this.dataSubscription = this.eyesCalculationService.sendData(transformedData).subscribe(
    //   (result: any) => {
    //     this.eyeDataLeft = result.eye_o_gauche;
    //     this.eyeDataRight = result.eye_o_droite;
    //     this.generatePDF();
    //   },
    //   (error) => {
    //     window.alert(error.error.error);
    //   }
    // );

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

    const pageWidth = doc.internal.pageSize.getWidth(); // Largeur de la page
    doc.text("Adaptation lentille de contact", pageWidth / 2, 20, { align: "center" });

    // Informations Magasin (Exemple)
    doc.setFontSize(12);
    doc.text('Magasin: [...]', 20, 40);
    doc.text('Adresse : [...]', 20, 45);
    doc.text('Par : [...]', 20, 50);
    doc.text('Fait le : ' + new Date().toLocaleDateString(), 150, 55);
    doc.text('A : [...]', 150, 60);
    doc.text('Porteur: [...]', 20, 65);
    doc.text('Age : [...]', 20, 70);

    // Tableau récapitulatif des données
    autoTable(doc, {
      head: [['Oeil', 'Droit', 'Gauche']],
      body: [
        [
          'Marque', 
          '[...]', 
          '[...]'
        ],
        [
          'Modèle', 
          `[...][${this.eyeDataRight.diametre}][${this.eyeDataRight.rayon}]`,
          `[...][${this.eyeDataLeft.diametre}][${this.eyeDataLeft.rayon}]`,


        ],
        [
          'Compensation', 
          '[...]',
          '[...]'
        ],
        [
          'Produit d\'entretien', 
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

    doc.text('Commentaire : [...]', 20, 140);
    
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptalyX", pageWidth / 2, 287, { align: "center" });

    // --------------- DEUXIEME PAGE --------------- //

    doc.addPage(); // Ajouter une nouvelle page
    doc.setFontSize(16);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0); // Noir

    doc.text("Compte Rendu Biomicroscopie", pageWidth / 2, 20, { align: "center" });

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
      startY: 85, // Position du tableau fixée à 85
      head: [
        [
          { content: 'Intitulé', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' } },
          { content: 'Commentaire', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } }
        ],
        ['OD', 'OG']
      ],
      body: [
        ['Oeil directeur VL / VP', { content: '', colSpan: 2, styles: { halign: 'center' } }], // Fusion OD & OG
        ['Oeil dominant VL / VP', { content: '', colSpan: 2, styles: { halign: 'center' } }], // Fusion OD & OG
        ['Réfraction lentille', '', ''],
        ['PSC', '', ''],
        ['DHIV', '', ''],
        ['Diamètre pupillaire', '', ''],
        ['FP / Recouvrement', '', ''],
        ['Tonus', '', ''],
        ['Clignement', { content: '', colSpan: 2, styles: { halign: 'center' } }], // Fusion OD & OG
        ['Kératométrie', '', ''],
        ['Hauteur prisme de larmes', '', ''],
        ['Charge lacrymale', '', ''],
        ['Lipides', '', '']
      ],
      styles: {
        halign: 'center', 
        valign: 'middle',
        lineWidth: 0.5,
        lineColor: [0, 0, 0] 
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l'en-tête
        textColor: [255, 255, 255], 
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Fond gris clair une ligne sur deux
      },
      columnStyles: {
        0: { cellWidth: 50, halign: 'center', fontStyle: 'bold' }, // Largeur fixe à 50px pour "Intitulé"
        1: { halign: 'center', cellWidth: 65 }, // Largeur de 65px pour OD
        2: { halign: 'center', cellWidth: 65 }  // Largeur de 65px pour OG
      }
    });
    
    doc.text('Commentaire : [...]', 20, 210);

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptiX", pageWidth / 2, 287, { align: "center" });

    // --------------- TROISIÈME PAGE --------------- //

    doc.addPage(); // Ajouter une nouvelle page
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0); // Noir

    // Informations Magasin (Exemple)
    doc.setFontSize(12);
    doc.text('NOM PRENOM', 20, 30);
    doc.text('ADRESSE', 20, 35);
    doc.text('VILLE', 20, 40);
    doc.text('NUM SECU SOCIALE', 20, 45);
    doc.text('NUM CONTRAT', 20, 50);

    doc.text('DESTINATAIRE', 140, 55);
    doc.text('ADRESSE', 140, 60);

    doc.text('Fait à [...], le ' + new Date().toLocaleDateString(), 140, 70);
    
    doc.text('Objet : [...]', 20, 80);

    doc.text('Madame, Monsieur,', 20, 90);

    doc.text('Par la présente lettre, je vous fais part de ma demande d\'information au sujet du \nremboursement des soins [...].', 20, 100);

    doc.text('En effet, des soins devront être réalisés et j\' aimerais savoir quel sera le montant de votre \nprise en charge pour [...].', 20, 120);
    
    doc.text('Ci-joint, une estimation des coûts réalisée par [...] qui me suit.', 20, 140);

    doc.text('Avec mes remerciements, je vous prie d\' agréer, Madame, Monsieur, mes \nrespectueuses salutations ', 20, 155);
    
    doc.text('Signature : ', 150, 180);
 
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptiX", pageWidth / 2, 287, { align: "center" });

    // --------------- QUATRIEME PAGE --------------- //

    doc.addPage(); // Ajouter une nouvelle page
    doc.setFontSize(16);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0); // Noir

    doc.text("Biomicroscopie lentilles", pageWidth / 2, 20, { align: "center" });

    // Informations Magasin (Exemple)
    doc.setFontSize(12);
    doc.text('Magasin: [...]', 20, 40);
    doc.text('Adresse : [...]', 20, 45);
    doc.text('Par : [...]', 20, 50);
    doc.text('Fait le : ' + new Date().toLocaleDateString(), 150, 55);
    doc.text('A : [...]', 150, 60);
    doc.text('Fait à : [ex: H + 2 / J + 4]', 20, 65);
    doc.text('Porteur: [...]', 20, 70);
    
    autoTable(doc, {
      startY: 85, // Position du tableau fixée à 85
      head: [
        [
          { content: 'Intitulé', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' } },
          { content: 'Commentaire', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } }
        ],
        ['OD', 'OG']
      ],
      body: [
        ['Lentille', '[...]', '[...]'],
        ['Recouvrement', 'Grade : [...]', 'Grade : [...]'],
        ['Centrage', 'Grade : [...]', 'Grade : [...]'],
        ['Mobilité', 'Grade : [...]', 'Grade : [...]'],
        ['Rotation', '[...]', '[...]'],
        ['Oscillation', '[...]', '[...]'],
        ['Particularité', '[...]', '[...]'],
        ['Conjonctive', '[...]', '[...]'],
        ['Cornée', '[...]', '[...]'],
        ['AV VL', '[...]', '[...]'],
        ['AV VL ODG', { content: '[...]', colSpan: 2, styles: { halign: 'center' } }], // Fusion OD & OG
        ['AV VP', '[...]', '[...]'],
        ['AV VP ODG', { content: '[...]', colSpan: 2, styles: { halign: 'center' } }], // Fusion OD & OG
        ['Surréfraction', '[...]', '[...]'],
        ['Confort subjectif', '[...]', '[...]']
      ],
      styles: {
        halign: 'center', 
        valign: 'middle',
        lineWidth: 0.5,
        lineColor: [0, 0, 0] 
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l'en-tête
        textColor: [255, 255, 255], 
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Fond gris clair une ligne sur deux
      },
      columnStyles: {
        0: { cellWidth: 50, halign: 'center', fontStyle: 'bold' }, // Largeur fixe à 50px pour "Intitulé"
        1: { halign: 'center', cellWidth: 65 }, // Largeur de 65px pour OD
        2: { halign: 'center', cellWidth: 65 }  // Largeur de 65px pour OG
      }
    });
    
    doc.text('Commentaire : [...]', 20, 225);

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    doc.text("Document réalisé grâce à la solution OptiX", pageWidth / 2, 287, { align: "center" });

    // --------------- FIN  --------------- //

    // Générer le PDF comme un Blob
    const pdfBlob = doc.output('blob');
  
    // Créer une URL temporaire pour le PDF et la marquer comme sûre
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl+this.pdfSettings);
    
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
