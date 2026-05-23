import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EyesMeasureStore } from '../../state/eyes-measure.store';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';

@Component({
  selector: 'app-generation-rapport-page',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './generation-rapport-page.component.html',
})
export class GenerationRapportPageComponent implements OnInit {
  temp: string | undefined;

  readonly nomClient   = 'Dupont';
  readonly prenomClient = 'Thomas';

  private readonly adresse      = 'Rue de la Paix, 12';
  private readonly ville        = 'Toulouse';
  private readonly numSecu      = '123456789012345';
  private readonly numContrat   = 'Z123456789012345';
  private readonly destinataire = 'Louis Dupont';
  private readonly commentaire  = '';
  private readonly magasin      = 'OptalyX';
  private readonly magasinAdresse = 'Route de Paris, 12';
  private readonly faitPar      = 'Jean Dupont';
  private readonly lieuFait     = 'Tournefeuille';
  private readonly porteur      = 'Jean Dupont';
  private readonly age          = '18 ans';
  private readonly raison       = 'ZED';

  readonly store = inject(EyesMeasureStore);
  private readonly eyesTearService = inject(FormTearsEyesDataService);

  ngOnInit(): void {
    const formDataMeasure = {
      droite: this.store.droite(),
      gauche: this.store.gauche(),
    };
    const formDataTear = this.eyesTearService.getFormData();
    this.temp = formDataMeasure.droite.sphere;

    const toNumbers = (obj: EyeMeasure): Record<string, number> =>
      Object.fromEntries(
        (Object.entries(obj) as [string, string][]).map(([k, v]) => [k, Number(v)])
      );

    this.store.calculateAndLoadPDF({
      eye_m_droite:   toNumbers(formDataMeasure.droite),
      eye_m_gauche:   toNumbers(formDataMeasure.gauche),
      eye_t_droite:   formDataTear.droite,
      eye_t_gauche:   formDataTear.gauche,
      nomClient:      this.nomClient,
      prenomClient:   this.prenomClient,
      adresse:        this.adresse,
      ville:          this.ville,
      numSecu:        this.numSecu,
      numContrat:     this.numContrat,
      destinataire:   this.destinataire,
      commentaire:    this.commentaire || 'Aucun commentaire.',
      magasin:        this.magasin,
      magasinAdresse: this.magasinAdresse,
      faitPar:        this.faitPar,
      lieuFait:       this.lieuFait,
      porteur:        this.porteur,
      age:            this.age,
      raison:         this.raison,
    });
  }

  downloadPDF(): void {
    this.store.downloadPDF(this.nomClient, this.prenomClient);
  }
}
