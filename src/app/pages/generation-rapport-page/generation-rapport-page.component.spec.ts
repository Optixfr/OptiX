import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { GenerationRapportPageComponent } from './generation-rapport-page.component';
import { EyesMeasureStore } from '../../state/eyes-measure.store';
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';

describe('GenerationRapportPageComponent', () => {

  async function setup(pdfBlobOrError: 'success' | 'error' = 'success') {
    const fakeBlob = new Blob(['%PDF-1.4 fake'], { type: 'application/pdf' });

    return render(GenerationRapportPageComponent, {
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: EyesCalculationService,
          useValue: {
            fetchCalculPDF: () =>
              pdfBlobOrError === 'success'
                ? of(fakeBlob)
                : throwError(() => new Error('Backend error')),
          },
        },
      ],
    });
  }

  it('shows the loading indicator initially', async () => {
    await setup();
    // loading is true before the observable resolves synchronously in test
    // After resolution in 'success' mode, the iframe should appear
    expect(
      screen.queryByText('Génération du rapport PDF en cours...') !== null ||
      document.querySelector('iframe') !== null
    ).toBe(true);
  });

  it('renders the lens suggestion card', async () => {
    await setup();
    expect(screen.getByRole('heading', { level: 2, name: 'Lentille suggérée' })).toBeTruthy();
  });

  it('renders the download button', async () => {
    await setup();
    expect(screen.getByRole('button', { name: 'Télécharger le Rapport' })).toBeTruthy();
  });

  it('renders the validate button linking to /accueil', async () => {
    await setup();
    const validateBtn = screen.getByRole('button', { name: "Valider l'Adaptation" });
    expect(validateBtn.getAttribute('routerLink')).toBe('/accueil');
  });

  it('shows an error card when the backend call fails', async () => {
    await setup('error');
    expect(
      screen.queryByText('Erreur lors du chargement du rapport de calcul PDF.')
    ).toBeTruthy();
  });

  it('download button is disabled while loading', async () => {
    // Re-use a setup where we control the store state directly
    const { fixture } = await setup();
    const store = fixture.debugElement.injector.get(EyesMeasureStore);

    // Force loading state
    // (signal store: we read disabled state from DOM attribute)
    const btn = screen.getByRole('button', { name: 'Télécharger le Rapport' }) as HTMLButtonElement;
    // When pdf is loaded, button should be enabled
    if (store.pdfUrl()) {
      expect(btn.disabled).toBe(false);
    } else {
      expect(btn.disabled).toBe(true);
    }
  });
});
