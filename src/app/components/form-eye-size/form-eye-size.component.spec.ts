import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FormEyeSizeComponent } from './form-eye-size.component';
import { EyeMeasure } from '../../models/eyes-measure.model';

@Component({
  standalone: true,
  imports: [FormEyeSizeComponent],
  template: `
    <app-form-eye-size 
      [nomFormulaire]="'Oeil Test'" 
      [measure]="measure" 
      (measureChange)="onMeasureChange($event)">
    </app-form-eye-size>
    
    <div data-testid="emitted-sphere">{{ emittedMeasure?.sphere }}</div>
    <div data-testid="emitted-cylindre">{{ emittedMeasure?.cylindre }}</div>
  `
})
class FormEyeSizeWrapperComponent {
  measure: EyeMeasure = {
    sphere: '1', cylindre: '2', axe: '3', dhiv: '4', dvo: '5', 
    k1: '6', x: '7', k2: '8', y: '9', excentricite: '0.5'
  };
  emittedMeasure: EyeMeasure | null = null;

  onMeasureChange(val: EyeMeasure) {
    this.emittedMeasure = val;
  }
}

describe('FormEyeSizeComponent Component Testing', () => {

  it('displays the correct form name', async () => {
    await render(FormEyeSizeWrapperComponent);
    
    // You get the element from the DOM directly
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('Oeil Test');
  });

  it('emits the Demo 1 preset when the user clicks the Demo 1 button', async () => {
    await render(FormEyeSizeWrapperComponent);
    const user = userEvent.setup();

    // Get the button like a user would (by text)
    const demo1Button = screen.getByText('Demo 1');
    
    // Simulate a real user click
    await user.click(demo1Button);

    // Assert that the emitted value (rendered in our test wrapper) is correct
    expect(screen.getByTestId('emitted-sphere').textContent).toBe('-8');
    expect(screen.getByTestId('emitted-cylindre').textContent).toBe('-3');
  });

  it('emits the updated value when the user types in the Sphere input', async () => {
    await render(FormEyeSizeWrapperComponent);
    const user = userEvent.setup();

    // Get the input by its label, just like a user reading the screen
    const sphereInput = screen.getByLabelText('Sphere');
    
    // User clears the field and types '-2.5'
    await user.clear(sphereInput);
    await user.type(sphereInput, '-2.5');

    // Assert that the component emitted the new sphere value correctly
    expect(screen.getByTestId('emitted-sphere').textContent).toBe('-2.5');
  });

});
