import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormTearsEyesDataService } from '../form-tear-size/form-tears-eyes-data.service';
import { FormSizeEyesDataService } from '../form-eyes-size/form-size-eyes-data.service';
import { EyesTear } from '../../models/eyes-tear.model';
import { EyesCalculationService } from '../calculation/eyes-calculation.service';

interface FormData {
  droite: EyesTear;
  gauche: EyesTear;
}

@Injectable({
  providedIn: `root`,
})
export class PdfGenerationService {
  private commentaire = ``;
  private nomClient = `Dupont`;
  private prenomClient = `Thomas`;
  private adresse = `Rue de la Paix, 12`;
  private ville = `Toulouse`;
  private numSecu = `123456789012345`;
  private numContrat = `Z123456789012345`;
  private destinataire = `Louis Dupont`;
  private dateLieu: string = new Date().toLocaleDateString();
  private objet = ``;
  private detailsSoins = ``;
  private estimation = ``;
  private signature = ``;
  private magasin = `OptalyX`;
  private magasinAdresse = `Route de Paris, 12`;
  private faitPar = `Jean Dupont`;
  private lieuFait = `Tournefeuille`;
  private porteur = `Jean Dupont`;
  private age = `18 ans`;
  private raison = `ZED`;

  eyeDataLeft: any;
  eyeDataRight: any;

  eyesTear: FormData = {
    droite: {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: '',
    },
    gauche: {
      psc: '',
      tonus: '',
      hauteurPrisme: '',
      gradeLipide: '',
      chargeLacrimale: '',
    },
  };

  dataSubscription: any;

  private doc: jsPDF = new jsPDF();

  constructor(
    private sanitizer: DomSanitizer,
    private formSizeEyesDataService: FormSizeEyesDataService,
    private formTearEyesDataService: FormTearsEyesDataService,
    private eyesCalculationService: EyesCalculationService,
    private eyesTearService: FormTearsEyesDataService
  ) {
    const formDataMeasure = this.formSizeEyesDataService.getFormData();
    const formDataTear = this.eyesTearService.getFormData();
    this.commentaire = this.eyesTearService.getCommentaire();

    const transformValuesToNumber = (obj: any) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, Number(value)])
      );

    const transformedData = {
      eye_m_droite: transformValuesToNumber(formDataMeasure.droite),
      eye_m_gauche: transformValuesToNumber(formDataMeasure.gauche),
      eye_t_droite: formDataTear.droite,
      eye_t_gauche: formDataTear.gauche,
    };

    this.dataSubscription = this.eyesCalculationService
      .sendData(transformedData)
      .subscribe(
        (result: any) => {
          this.eyeDataLeft = result.eye_o_gauche;
          this.eyeDataRight = result.eye_o_droite;
        },
        (error) => {
          window.alert(error.error.error);
        }
      );

    console.log(this.eyeDataLeft);
    console.log(this.eyeDataRight);

    this.eyesTear = this.eyesTearService.getFormData();
  }

  generatepdfff(): SafeResourceUrl {
    const pageWidth = this.doc.internal.pageSize.getWidth(); // Largeur de la page

    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0); // Noir

    // Informations Magasin (Exemple)
    this.doc.setFontSize(12);
    this.doc.text(this.nomClient + ` ` + this.prenomClient, 20, 30);
    this.doc.text(this.adresse, 20, 35);
    this.doc.text(this.ville, 20, 40);
    this.doc.text(this.numSecu, 20, 45);
    this.doc.text(this.numContrat, 20, 50);

    this.doc.text(this.destinataire, 140, 55);
    this.doc.text(this.adresse, 140, 60);

    this.doc.text(
      `Fait à ${this.ville}, le ` + new Date().toLocaleDateString(),
      140,
      70
    );

    this.doc.text(`Objet : ${this.objet}`, 20, 80);

    this.doc.text(`Madame, Monsieur,`, 20, 90);

    this.doc.text(
      `Par la présente lettre, je vous fais part de ma demande d\`information au sujet du \nremboursement des soins [...].`,
      20,
      100
    );

    this.doc.text(
      `En effet, des soins devront être réalisés et j\` aimerais savoir quel sera le montant de votre \nprise en charge pour [...].`,
      20,
      120
    );

    this.doc.text(
      `Ci-joint, une estimation des coûts réalisée par [...] qui me suit.`,
      20,
      140
    );

    this.doc.text(
      `Avec mes remerciements, je vous prie d\` agréer, Madame, Monsieur, mes \nrespectueuses salutations `,
      20,
      155
    );

    this.doc.text(`Signature : `, 150, 180);

    this.doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    this.doc.text(
      'this.document réalisé grâce à la solution OptiX',
      pageWidth / 2,
      287,
      {
        align: 'center',
      }
    );

    // --------------- QUATRIEME PAGE --------------- //

    this.doc.addPage(); // Ajouter une nouvelle page
    this.doc.setFontSize(16);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0); // Noir

    this.doc.text('Biomicroscopie lentilles', pageWidth / 2, 20, {
      align: 'center',
    });

    // Informations Magasin (Exemple)
    this.doc.setFontSize(12);
    this.doc.text(`Magasin: ${this.magasin}`, 20, 40);
    this.doc.text(`Adresse : ${this.adresse}`, 20, 45);
    this.doc.text(`Par : ${this.faitPar}`, 20, 50);
    this.doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    this.doc.text(`A : ${this.lieuFait}`, 150, 60);
    this.doc.text(`Fait à : [ex: H + 2 / J + 4]`, 20, 65);
    this.doc.text(`Porteur: ${this.porteur}`, 20, 70);

    autoTable(this.doc, {
      startY: 85, // Position du tableau fixée à 85
      head: [
        [
          {
            content: `Intitulé`,
            rowSpan: 2,
            styles: { halign: `center`, valign: `middle`, fontStyle: `bold` },
          },
          {
            content: `Commentaire`,
            colSpan: 2,
            styles: { halign: `center`, fontStyle: `bold` },
          },
        ],
        [`OD`, `OG`],
      ],
      body: [
        [`Lentille`, `[...]`, `[...]`],
        [`Recouvrement`, `Grade : [...]`, `Grade : [...]`],
        [`Centrage`, `Grade : [...]`, `Grade : [...]`],
        [`Mobilité`, `Grade : [...]`, `Grade : [...]`],
        [`Rotation`, `[...]`, `[...]`],
        [`Oscillation`, `[...]`, `[...]`],
        [`Particularité`, `[...]`, `[...]`],
        [`Conjonctive`, `[...]`, `[...]`],
        [`Cornée`, `[...]`, `[...]`],
        [`AV VL`, `[...]`, `[...]`],
        [
          `AV VL ODG`,
          { content: `[...]`, colSpan: 2, styles: { halign: `center` } },
        ], // Fusion OD & OG
        [`AV VP`, `[...]`, `[...]`],
        [
          `AV VP ODG`,
          { content: `[...]`, colSpan: 2, styles: { halign: `center` } },
        ], // Fusion OD & OG
        [`Surréfraction`, `[...]`, `[...]`],
        [`Confort subjectif`, `[...]`, `[...]`],
      ],
      styles: {
        halign: `center`,
        valign: `middle`,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l`en-tête
        textColor: [255, 255, 255],
        fontStyle: `bold`,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Fond gris clair une ligne sur deux
      },
      columnStyles: {
        0: { cellWidth: 50, halign: `center`, fontStyle: `bold` }, // Largeur fixe à 50px pour "Intitulé"
        1: { halign: `center`, cellWidth: 65 }, // Largeur de 65px pour OD
        2: { halign: `center`, cellWidth: 65 }, // Largeur de 65px pour OG
      },
    });

    this.doc.text(`Commentaire : ${this.commentaire}`, 20, 225);

    this.doc.setFont('times', 'italic');
    this.doc.setFontSize(10);
    this.doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    this.addFooter(this.doc, pageWidth);

    const pdfBlob = this.doc.output(`blob`);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  generateCRBiomicroscopiePDF(): SafeResourceUrl {
    this.doc.addPage(); // Ajouter une nouvelle page
    const pageWidth = this.doc.internal.pageSize.getWidth(); // Largeur de la page

    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0); // Noir

    this.doc.text('Compte Rendu Biomicroscopie', pageWidth / 2, 20, {
      align: 'center',
    });

    this.doc.setFontSize(12);
    this.doc.text(`Magasin: ${this.magasin}`, 20, 40);
    this.doc.text(`Adresse : ${this.adresse}`, 20, 45);
    this.doc.text(`Par : ${this.faitPar}`, 20, 50);
    this.doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    this.doc.text(`A : ${this.lieuFait}`, 150, 60);
    this.doc.text(`Porteur: ${this.porteur}`, 20, 65);
    this.doc.text(`Age : ${this.age}`, 20, 70);
    this.doc.text(`Raison : ${this.raison}`, 20, 75);

    autoTable(this.doc, {
      startY: 85, // Position du tableau fixée à 85
      head: [
        [
          {
            content: `Intitulé`,
            rowSpan: 2,
            styles: { halign: `center`, valign: `middle`, fontStyle: `bold` },
          },
          {
            content: `Commentaire`,
            colSpan: 2,
            styles: { halign: `center`, fontStyle: `bold` },
          },
        ],
        [`OD`, `OG`],
      ],
      body: [
        [
          `Oeil directeur VL / VP`,
          { content: ``, colSpan: 2, styles: { halign: `center` } },
        ], // Fusion OD & OG
        [
          `Oeil dominant VL / VP`,
          { content: ``, colSpan: 2, styles: { halign: `center` } },
        ], // Fusion OD & OG
        [`Réfraction lentille`, ``, ``],
        [`PSC`, `${this.eyesTear.droite.psc}`, `${this.eyesTear.gauche.psc}`],
        [`DHIV`, `13`, `13`],
        [`Diamètre pupillaire`, `13`, ``],
        [`FP / Recouvrement`, `13`, ``],
        [
          `Tonus`,
          `${this.eyesTear.droite.tonus}`,
          `${this.eyesTear.gauche.tonus}`,
        ],
        [
          `Clignement`,
          { content: ``, colSpan: 2, styles: { halign: `center` } },
        ], // Fusion OD & OG
        [`Kératométrie`, ``, ``],
        [
          `Hauteur prisme de larmes`,
          `${this.eyesTear.droite.hauteurPrisme}`,
          `${this.eyesTear.gauche.hauteurPrisme}`,
        ],
        [
          `Charge lacrymale`,
          `${this.eyesTear.droite.chargeLacrimale}`,
          `${this.eyesTear.gauche.tonus}`,
        ],
        [
          `Lipides`,
          `${this.eyesTear.droite.gradeLipide}`,
          `${this.eyesTear.gauche.gradeLipide}`,
        ],
      ],
      styles: {
        halign: `center`,
        valign: `middle`,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l`en-tête
        textColor: [255, 255, 255],
        fontStyle: `bold`,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Fond gris clair une ligne sur deux
      },
      columnStyles: {
        0: { cellWidth: 50, halign: `center`, fontStyle: `bold` }, // Largeur fixe à 50px pour "Intitulé"
        1: { halign: `center`, cellWidth: 65 }, // Largeur de 65px pour OD
        2: { halign: `center`, cellWidth: 65 }, // Largeur de 65px pour OG
      },
    });

    this.doc.text(`Commentaire : ${this.commentaire}`, 20, 210);

    this.doc.setFont('times', 'italic');
    this.doc.setFontSize(10);
    this.doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    this.addFooter(this.doc, pageWidth);

    const pdfBlob = this.doc.output(`blob`);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  generateAdapterPDF(): SafeResourceUrl {
    this.doc.addPage(); // Ajouter une nouvelle page
    this.doc.setFontSize(16);

    const pageWidth = this.doc.internal.pageSize.getWidth(); // Largeur de la page
    this.doc.text(`Adaptation lentille de contact`, pageWidth / 2, 20, {
      align: `center`,
    });

    this.doc.setFontSize(12);
    this.doc.text(`Magasin: ${this.magasin}`, 20, 40);
    this.doc.text(`Adresse : ${this.adresse}`, 20, 45);
    this.doc.text(`Par : ${this.faitPar}`, 20, 50);
    this.doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    this.doc.text(`A : ${this.lieuFait}`, 150, 60);
    this.doc.text(`Porteur: ${this.porteur}`, 20, 65);
    this.doc.text(`Age : ${this.age}`, 20, 70);

    // Tableau récapitulatif des données
    autoTable(this.doc, {
      head: [[`Oeil`, `Droit`, `Gauche`]],
      body: [
        [`Marque`, `[...]`, `[...]`],
        [
          `Modèle`,
          `[...][${this.eyeDataRight.diametre}][${this.eyeDataRight.rayon}]`,
          `[...][${this.eyeDataLeft.diametre}][${this.eyeDataLeft.rayon}]`,
        ],
        [`Compensation`, `[...]`, `[...]`],
        ['Produit d`entretien', `[...]`, `[...]`],
      ],
      startY: 90,
      styles: {
        halign: `center`, // Centrage horizontal du texte dans les cellules
        valign: `middle`, // Centrage vertical du texte dans les cellules
        lineWidth: 0.2, // Épaisseur des bordures
        lineColor: [0, 0, 0], // Couleur des bordures (noir)
      },
      headStyles: {
        fillColor: [0, 76, 153], // Bleu foncé pour l`en-tête
        textColor: [255, 255, 255], // Texte en blanc
        halign: `center`,
        valign: `middle`,
        fontStyle: `bold`, // Texte en gras pour l`en-tête
      },
      bodyStyles: {
        textColor: 0, // Texte en noir
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220], // Gris très clair pour une ligne sur deux
      },
      columnStyles: {
        0: { halign: `center` }, // Centrer la première colonne
        1: { halign: `center` }, // Centrer la deuxième colonne
        2: { halign: `center` }, // Centrer la troisième colonne
      },
    });

    this.doc.text(`Commentaire : ${this.commentaire}`, 20, 140);

    this.doc.setFont(`times`, `italic`);
    this.doc.setFontSize(10);
    this.doc.setTextColor(150); // Gris (0 = noir, 255 = blanc)
    this.addFooter(this.doc, pageWidth);

    const pdfBlob = this.doc.output(`blob`);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  generateAlldocumentsPDF(): SafeResourceUrl {
    this.generatepdfff();
    this.generateCRBiomicroscopiePDF();
    this.generateAdapterPDF();

    const pdfBlob = this.doc.output(`blob`);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  private addFooter(doc: jsPDF, pageWidth: number) {
    this.doc.setFont(`times`, `italic`);
    this.doc.setFontSize(10);
    this.doc.setTextColor(150);
    this.doc.text(
      `this.document réalisé grâce à la solution OptalyX`,
      pageWidth / 2,
      287,
      { align: `center` }
    );
  }
}
