import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormTearsEyesPageComponent } from './form-tears-eyes-page.component';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';

describe('FormTearsEyesPageComponent', () => {

  async function setup() {
    return render(FormTearsEyesPageComponent, {
      providers: [provideRouter([]), provideHttpClient()],
    });
  }

  it('renders a tear form for the right eye by default', async () => {
    await setup();
    expect(screen.getByText(/Oeil Droit/i)).toBeTruthy();
  });

  it('renders the commentaire textarea', async () => {
    await setup();
    expect(screen.getByPlaceholderText(/commentaire/i)).toBeTruthy();
  });

  it('renders the submit button', async () => {
    await setup();
    expect(screen.getByRole('button', { name: /Soumettre|Générer|Suivant/i })).toBeTruthy();
  });

  it('getCommentaire() returns the current commentaire value', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    component.commentaire = 'Test commentaire';
    expect(component.getCommentaire()).toBe('Test commentaire');
  });

  it('addSideForm() sets isDuplicatedForm to true and calls service', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(FormTearsEyesDataService);
    const dupSpy = vi.spyOn(service, 'duplicateRightForm');

    component.addSideForm();
    fixture.detectChanges();

    expect(component.isDuplicatedForm).toBe(true);
    expect(dupSpy).toHaveBeenCalledTimes(1);
  });
});
