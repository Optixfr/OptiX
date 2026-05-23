import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormSizeEyesPageComponent } from './form-size-eyes-page.component';
import { EyesMeasureStore } from '../../state/eyes-measure.store';

describe('FormSizeEyesPageComponent', () => {

  async function setup() {
    return render(FormSizeEyesPageComponent, {
      providers: [provideRouter([]), provideHttpClient()],
    });
  }

  it('renders the right eye form', async () => {
    await setup();
    // The right eye form always renders
    expect(screen.getByText(/Biométrie Oeil Droit/)).toBeTruthy();
  });

  it('shows the "add left eye" button before duplication', async () => {
    await setup();
    expect(screen.getByText("Ajouter l'Oeil Gauche")).toBeTruthy();
  });

  it('shows both eye forms after clicking the add button', async () => {
    const { fixture } = await setup();
    const store = fixture.debugElement.injector.get(EyesMeasureStore);

    store.duplicateRightForm();
    fixture.detectChanges();

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.some(h => h.textContent?.includes('Oeil Droit'))).toBe(true);
    expect(headings.some(h => h.textContent?.includes('Oeil Gauche'))).toBe(true);
  });

  it('hides the "add left eye" button after duplication', async () => {
    const { fixture } = await setup();
    const store = fixture.debugElement.injector.get(EyesMeasureStore);

    store.duplicateRightForm();
    fixture.detectChanges();

    expect(screen.queryByText("Ajouter l'Oeil Gauche")).toBeNull();
  });

  it('renders the navigation button to the next step', async () => {
    await setup();
    expect(screen.getByRole('button', { name: "Évaluer les critères" })).toBeTruthy();
  });
});
