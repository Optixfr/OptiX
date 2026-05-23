import { Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FormEyeSizeComponent } from './form-eye-size.component';
import { EyeMeasure } from '../../models/eyes-measure.model';

@Component({
  standalone: true,
  imports: [FormEyeSizeComponent],
  template: `
    <app-form-eye-size
      [nomFormulaire]="'Oeil Test'"
      [measure]="measure()"
      (measureChange)="onMeasureChange($event)">
    </app-form-eye-size>

    <div data-testid="emitted-sphere">{{ emittedMeasure?.sphere }}</div>
    <div data-testid="emitted-cylindre">{{ emittedMeasure?.cylindre }}</div>
  `
})
class FormEyeSizeWrapperComponent {
  readonly measure = signal<EyeMeasure>({
    sphere: '1', cylindre: '2', axe: '3', dhiv: '4', dvo: '5',
    k1: '6', x: '7', k2: '8', y: '9', excentricite: '0.5'
  });
  emittedMeasure: EyeMeasure | null = null;

  onMeasureChange(val: EyeMeasure) {
    this.emittedMeasure = val;
  }
}

describe('FormEyeSizeComponent (Signal Forms)', () => {

  it('displays the correct form name', async () => {
    await render(FormEyeSizeWrapperComponent);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('Oeil Test');
  });

  it('binds the parent measure into the signal form fields', async () => {
    await render(FormEyeSizeWrapperComponent);

    const sphereInput = screen.getByLabelText('Sphere') as HTMLInputElement;
    expect(sphereInput.value).toBe('1');
  });

  it('emits the Demo 1 preset (debounced) when the user clicks the Demo 1 button', async () => {
    await render(FormEyeSizeWrapperComponent);
    const user = userEvent.setup();

    await user.click(screen.getByText('Demo 1'));

    // Emission is debounced via Angular 22 `debounced()`, so wait for it.
    await waitFor(() => {
      expect(screen.getByTestId('emitted-sphere').textContent).toBe('-8');
      expect(screen.getByTestId('emitted-cylindre').textContent).toBe('-3');
    });
  });

  it('emits the updated value (debounced) when the user types in the Sphere input', async () => {
    await render(FormEyeSizeWrapperComponent);
    const user = userEvent.setup();

    const sphereInput = screen.getByLabelText('Sphere');
    await user.clear(sphereInput);
    await user.type(sphereInput, '-2.5');

    await waitFor(() => {
      expect(screen.getByTestId('emitted-sphere').textContent).toBe('-2.5');
    });
  });
});
