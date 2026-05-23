import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { EyesMeasureStore } from '../../state/eyes-measure.store';
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';

@Component({
  selector: 'app-generation-rapport-page',
  standalone: true,
  imports: [
    LateralNavbarComponent,
    TopBarComponent,
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './generation-rapport-page.component.html',
})
export class GenerationRapportPageComponent implements OnInit, OnDestroy {
  pdfUrl: SafeResourceUrl | undefined;
  pdfBlob: Blob | undefined;
  dataSubscription: Subscription | undefined;
  temp: any;

  private nomClient = 'Dupont';
  private prenomClient = 'Thomas';
  private adresse = 'Rue de la Paix, 12';
  private ville = 'Toulouse';
  private numSecu = '123456789012345';
  private numContrat = 'Z123456789012345';
  private destinataire = 'Louis Dupont';
  private commentaire = '';
  private magasin = 'OptalyX';
  private magasinAdresse = 'Route de Paris, 12';
  private faitPar = 'Jean Dupont';
  private lieuFait = 'Tournefeuille';
  private porteur = 'Jean Dupont';
  private age = '18 ans';
  private raison = 'ZED';

  private store = inject(EyesMeasureStore);

  constructor(
    private sanitizer: DomSanitizer,
    private eyesCalculationService: EyesCalculationService,
    private eyesTearService: FormTearsEyesDataService
  ) {}

  ngOnInit() {
    const formDataMeasure = {
      droite: this.store.droite(),
      gauche: this.store.gauche()
    };
    const formDataTear = this.eyesTearService.getFormData();
    this.temp = formDataMeasure.droite.sphere;

    const transformValuesToNumber = (obj: any) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, Number(value)])
      );

    const transformedData = {
      eye_m_droite: transformValuesToNumber(formDataMeasure.droite),
      eye_m_gauche: transformValuesToNumber(formDataMeasure.gauche),
      eye_t_droite: formDataTear.droite,
      eye_t_gauche: formDataTear.gauche,
      nomClient: this.nomClient,
      prenomClient: this.prenomClient,
      adresse: this.adresse,
      ville: this.ville,
      numSecu: this.numSecu,
      numContrat: this.numContrat,
      destinataire: this.destinataire,
      commentaire: this.commentaire || 'Aucun commentaire.',
      magasin: this.magasin,
      magasinAdresse: this.magasinAdresse,
      faitPar: this.faitPar,
      lieuFait: this.lieuFait,
      porteur: this.porteur,
      age: this.age,
      raison: this.raison,
    };

    // Call backend PDF endpoint and render it inside the iframe
    this.dataSubscription = this.eyesCalculationService
      .fetchCalculPDF(transformedData)
      .subscribe(
        (blob: Blob) => {
          this.pdfBlob = blob;
          const pdfObjectUrl = URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
        },
        (error) => {
          console.error('Error fetching PDF:', error);
          window.alert('Erreur lors du chargement du rapport de calcul PDF.');
        }
      );
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  downloadPDF(): void {
    if (this.pdfBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(this.pdfBlob);
      link.download = `rapport_prise_en_charge_${this.nomClient}_${this.prenomClient}.pdf`;
      link.click();
    }
  }
}
