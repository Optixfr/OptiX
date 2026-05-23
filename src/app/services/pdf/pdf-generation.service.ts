import { Injectable, inject } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormTearsEyesDataService } from '../form-tear-size/form-tears-eyes-data.service';
import { EyesMeasureStore } from '../../state/eyes-measure.store';
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
  private eyesMeasureStore = inject(EyesMeasureStore);

  constructor(
    private sanitizer: DomSanitizer,
    private formTearEyesDataService: FormTearsEyesDataService,
    private eyesCalculationService: EyesCalculationService,
    private eyesTearService: FormTearsEyesDataService
  ) {
    const formDataMeasure = { droite: this.eyesMeasureStore.droite(), gauche: this.eyesMeasureStore.gauche() };
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

  // --- Public PDF Entry Points (Pure & Stateless) ---

  generatepdfff(): SafeResourceUrl {
    const doc = new jsPDF();
    this.buildFirstPage(doc);
    doc.addPage();
    this.buildSecondPage(doc);
    return this.finalizePdf(doc);
  }

  generateCRBiomicroscopiePDF(): SafeResourceUrl {
    const doc = new jsPDF();
    this.buildThirdPage(doc);
    return this.finalizePdf(doc);
  }

  generateAdapterPDF(): SafeResourceUrl {
    const doc = new jsPDF();
    this.buildFourthPage(doc);
    return this.finalizePdf(doc);
  }

  generateAlldocumentsPDF(): SafeResourceUrl {
    const doc = new jsPDF();
    this.buildFirstPage(doc);
    doc.addPage();
    this.buildSecondPage(doc);
    doc.addPage();
    this.buildThirdPage(doc);
    doc.addPage();
    this.buildFourthPage(doc);
    return this.finalizePdf(doc);
  }

  // --- Stateless Page Builders ---

  private buildFirstPage(doc: jsPDF) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0); // Noir

    doc.setFontSize(12);
    doc.text(this.nomClient + ` ` + this.prenomClient, 20, 30);
    doc.text(this.adresse, 20, 35);
    doc.text(this.ville, 20, 40);
    doc.text(this.numSecu, 20, 45);
    doc.text(this.numContrat, 20, 50);

    doc.text(this.destinataire, 140, 55);
    doc.text(this.adresse, 140, 60);

    doc.text(
      `Fait à ${this.ville}, le ` + new Date().toLocaleDateString(),
      140,
      70
    );

    doc.text(`Objet : ${this.objet}`, 20, 80);
    doc.text(`Madame, Monsieur,`, 20, 90);

    doc.text(
      `Par la présente lettre, je vous fais part de ma demande d\`information au sujet du \nremboursement des soins [...].`,
      20,
      100
    );

    doc.text(
      `En effet, des soins devront être réalisés et j\` aimerais savoir quel sera le montant de votre \nprise en charge pour [...].`,
      20,
      120
    );

    doc.text(
      `Ci-joint, une estimation des coûts réalisée par [...] qui me suit.`,
      20,
      140
    );

    doc.text(
      `Avec mes remerciements, je vous prie d\` agréer, Madame, Monsieur, mes \nrespectueuses salutations `,
      20,
      155
    );

    doc.text(`Signature : `, 150, 180);

    doc.setTextColor(150); // Gris
    doc.text(
      'this.document réalisé grâce à la solution OptiX',
      pageWidth / 2,
      287,
      { align: 'center' }
    );
  }

  private buildSecondPage(doc: jsPDF) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0); // Noir

    doc.text('Biomicroscopie lentilles', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Magasin: ${this.magasin}`, 20, 40);
    doc.text(`Adresse : ${this.adresse}`, 20, 45);
    doc.text(`Par : ${this.faitPar}`, 20, 50);
    doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    doc.text(`A : ${this.lieuFait}`, 150, 60);
    doc.text(`Fait à : [ex: H + 2 / J + 4]`, 20, 65);
    doc.text(`Porteur: ${this.porteur}`, 20, 70);

    autoTable(doc, {
      startY: 85,
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
        ],
        [`AV VP`, `[...]`, `[...]`],
        [
          `AV VP ODG`,
          { content: `[...]`, colSpan: 2, styles: { halign: `center` } },
        ],
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
        fillColor: [0, 76, 153],
        textColor: [255, 255, 255],
        fontStyle: `bold`,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { cellWidth: 50, halign: `center`, fontStyle: `bold` },
        1: { halign: `center`, cellWidth: 65 },
        2: { halign: `center`, cellWidth: 65 },
      },
    });

    doc.text(`Commentaire : ${this.commentaire}`, 20, 225);
    this.addFooter(doc, pageWidth);
  }

  private buildThirdPage(doc: jsPDF) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0); // Noir

    doc.text('Compte Rendu Biomicroscopie', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Magasin: ${this.magasin}`, 20, 40);
    doc.text(`Adresse : ${this.adresse}`, 20, 45);
    doc.text(`Par : ${this.faitPar}`, 20, 50);
    doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    doc.text(`A : ${this.lieuFait}`, 150, 60);
    doc.text(`Porteur: ${this.porteur}`, 20, 65);
    doc.text(`Age : ${this.age}`, 20, 70);
    doc.text(`Raison : ${this.raison}`, 20, 75);

    autoTable(doc, {
      startY: 85,
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
        ],
        [
          `Oeil dominant VL / VP`,
          { content: ``, colSpan: 2, styles: { halign: `center` } },
        ],
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
        ],
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
        fillColor: [0, 76, 153],
        textColor: [255, 255, 255],
        fontStyle: `bold`,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { cellWidth: 50, halign: `center`, fontStyle: `bold` },
        1: { halign: `center`, cellWidth: 65 },
        2: { halign: `center`, cellWidth: 65 },
      },
    });

    doc.text(`Commentaire : ${this.commentaire}`, 20, 210);
    this.addFooter(doc, pageWidth);
  }

  private buildFourthPage(doc: jsPDF) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(16);
    doc.text(`Adaptation lentille de contact`, pageWidth / 2, 20, { align: `center` });

    doc.setFontSize(12);
    doc.text(`Magasin: ${this.magasin}`, 20, 40);
    doc.text(`Adresse : ${this.adresse}`, 20, 45);
    doc.text(`Par : ${this.faitPar}`, 20, 50);
    doc.text(`Fait le : ` + new Date().toLocaleDateString(), 150, 55);
    doc.text(`A : ${this.lieuFait}`, 150, 60);
    doc.text(`Porteur: ${this.porteur}`, 20, 65);
    doc.text(`Age : ${this.age}`, 20, 70);

    autoTable(doc, {
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
        halign: `center`,
        valign: `middle`,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 76, 153],
        textColor: [255, 255, 255],
        halign: `center`,
        valign: `middle`,
        fontStyle: `bold`,
      },
      bodyStyles: {
        textColor: 0,
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220],
      },
      columnStyles: {
        0: { halign: `center` },
        1: { halign: `center` },
        2: { halign: `center` },
      },
    });

    doc.text(`Commentaire : ${this.commentaire}`, 20, 140);
    this.addFooter(doc, pageWidth);
  }

  // --- Finalize PDF Helper ---

  private finalizePdf(doc: jsPDF): SafeResourceUrl {
    const pdfBlob = doc.output(`blob`);
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
  }

  private addFooter(doc: jsPDF, pageWidth: number) {
    doc.setFont(`times`, `italic`);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `this.document réalisé grâce à la solution OptalyX`,
      pageWidth / 2,
      287,
      { align: `center` }
    );
  }
}
