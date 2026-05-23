import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { LateralNavbarComponent } from './lateral-navbar.component';

describe('LateralNavbarComponent', () => {

  async function setup(isExtended = false) {
    const { fixture } = await render(LateralNavbarComponent, {
      providers: [provideRouter([])],
    });
    const component = fixture.componentInstance;
    component.isExtended = isExtended;
    fixture.detectChanges();
    return { fixture, component };
  }

  it('renders the collapsed logo when not extended', async () => {
    await setup(false);
    const logo = screen.getByAltText('logo') as HTMLImageElement;
    expect(logo.src).toContain('optalyx_oeil_blanc.png');
  });

  it('renders the full logo when extended', async () => {
    await setup(true);
    const logo = screen.getByAltText('logo') as HTMLImageElement;
    expect(logo.src).toContain('optalyx_blanc.png');
  });

  it('shows navigation labels when extended', async () => {
    await setup(true);
    expect(screen.getByText('Accueil')).toBeTruthy();
    expect(screen.getByText('Outils')).toBeTruthy();
    expect(screen.getByText('Déconnexion')).toBeTruthy();
  });

  it('hides navigation labels when collapsed', async () => {
    await setup(false);
    expect(screen.queryByText('Accueil')).toBeNull();
    expect(screen.queryByText('Outils')).toBeNull();
  });

  it('calls deco() and navigates to /connexion on confirmed logout', async () => {
    const { component } = await setup(true);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');
    removeSpy.mockClear();

    component.deco();

    expect(removeSpy).toHaveBeenCalledWith('token');
  });

  it('does NOT remove token when logout is cancelled', async () => {
    const { component } = await setup(true);
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');
    removeSpy.mockClear();

    component.deco();

    expect(removeSpy).not.toHaveBeenCalled();
  });
});
