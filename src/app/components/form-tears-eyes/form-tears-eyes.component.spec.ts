import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FormTearsEyesComponent } from './form-tears-eyes.component';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { EyesTear } from '../../models/eyes-tear.model';

const defaultTear: EyesTear = {
  psc: 'standard',
  tonus: 'standard',
  hauteurPrisme: '0',
  gradeLipide: 'standard',
  chargeLacrimale: 'standard',
};

describe('FormTearsEyesComponent', () => {

  async function setup(nomFormulaire = 'Oeil Droit') {
    return render(FormTearsEyesComponent, {
      inputs: { nomFormulaire },
    });
  }

  it('renders the form title', async () => {
    await setup('Oeil Droit');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Oeil Droit');
  });

  it('renders all 5 form controls', async () => {
    await setup();
    expect(screen.getByLabelText('PSC')).toBeTruthy();
    expect(screen.getByLabelText('Tonus')).toBeTruthy();
    expect(screen.getByLabelText('Hauteur Prisme')).toBeTruthy();
    expect(screen.getByLabelText('Grade Lipide')).toBeTruthy();
    expect(screen.getByLabelText('Charge Lacrimale')).toBeTruthy();
  });

  it('loads right eye data when formName contains "Droit" only', async () => {
    const { fixture } = await setup('Oeil Droit');
    const service = fixture.debugElement.injector.get(FormTearsEyesDataService);
    // getFormData().droite is the source of truth
    expect(fixture.componentInstance.eyesTear).toEqual(service.getFormData().droite);
  });

  it('loads left eye data when formName contains "Gauche" only', async () => {
    const { fixture } = await setup('Oeil Gauche');
    const service = fixture.debugElement.injector.get(FormTearsEyesDataService);
    expect(fixture.componentInstance.eyesTear).toEqual(service.getFormData().gauche);
  });

  it('loads right eye data when formName contains both "Droit" and "Gauche"', async () => {
    const { fixture } = await setup('Oeil Droit = Oeil Gauche');
    const service = fixture.debugElement.injector.get(FormTearsEyesDataService);
    expect(fixture.componentInstance.eyesTear).toEqual(service.getFormData().droite);
  });

  it('updates hauteurPrisme when the user types a new value', async () => {
    const user = userEvent.setup();
    const { fixture } = await setup('Oeil Droit');

    const input = screen.getByLabelText('Hauteur Prisme') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '3.5');

    expect(Number(fixture.componentInstance.eyesTear.hauteurPrisme)).toBe(3.5);
  });

  it('getFormData() returns the current eyesTear value', async () => {
    const { fixture } = await setup('Oeil Droit');
    const component = fixture.componentInstance;
    expect(component.getFormData()).toBe(component.eyesTear);
  });
});
