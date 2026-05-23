import { inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { EyeMeasure } from '../models/eyes-measure.model';
import { EyesCalculationService } from '../services/calculation/eyes-calculation.service';

export interface EyesMeasureState {
  droite: EyeMeasure;
  gauche: EyeMeasure;
  isDuplicated: boolean;
  pdfUrl: SafeResourceUrl | null;
  pdfBlob: Blob | null;
  loading: boolean;
  error: string | null;
}

const initialState: EyesMeasureState = {
  droite: {
    sphere: '0',
    cylindre: '0',
    axe: '0',
    dhiv: '0',
    dvo: '0',
    k1: '0',
    x: '0',
    k2: '0',
    y: '0',
    excentricite: '0',
  },
  gauche: {
    sphere: '0',
    cylindre: '0',
    axe: '0',
    dhiv: '0',
    dvo: '0',
    k1: '0',
    x: '0',
    k2: '0',
    y: '0',
    excentricite: '0',
  },
  isDuplicated: false,
  pdfUrl: null,
  pdfBlob: null,
  loading: false,
  error: null,
};

export const EyesMeasureStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    calculationService = inject(EyesCalculationService),
    sanitizer = inject(DomSanitizer)
  ) => ({
    updateRightEye(measure: Partial<EyeMeasure>) {
      patchState(store, (state) => ({
        droite: { ...state.droite, ...measure },
        gauche: state.isDuplicated ? { ...state.droite, ...measure } : state.gauche,
      }));
    },
    updateLeftEye(measure: Partial<EyeMeasure>) {
      patchState(store, (state) => ({
        gauche: { ...state.gauche, ...measure },
      }));
    },
    setFormData(data: { droite: EyeMeasure; gauche: EyeMeasure }) {
      patchState(store, {
        droite: data.droite,
        gauche: data.gauche,
      });
    },
    duplicateRightForm() {
      patchState(store, (state) => ({
        gauche: { ...state.droite },
        isDuplicated: true,
      }));
    },
    reset() {
      patchState(store, initialState);
    },
    calculateAndLoadPDF(transformedData: any) {
      // Avoid double fetching if already fetching or loaded
      if (store.loading()) return;

      patchState(store, { loading: true, error: null, pdfUrl: null, pdfBlob: null });

      calculationService.fetchCalculPDF(transformedData).subscribe({
        next: (blob: Blob) => {
          const pdfObjectUrl = URL.createObjectURL(blob);
          const safeUrl = sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
          patchState(store, {
            pdfBlob: blob,
            pdfUrl: safeUrl,
            loading: false,
          });
        },
        error: (err) => {
          console.error('Error fetching PDF inside store:', err);
          patchState(store, {
            loading: false,
            error: 'Erreur lors du chargement du rapport de calcul PDF.',
          });
        }
      });
    },
    downloadPDF(nomClient: string, prenomClient: string) {
      const blob = store.pdfBlob();
      if (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `rapport_prise_en_charge_${nomClient}_${prenomClient}.pdf`;
        link.click();
      }
    }
  }))
);
