import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TopBarComponent } from './top-bar.component';
import { NavbarService } from '../../services/navbar-service/navbar-service.service';

describe('TopBarComponent', () => {

  it('renders the menu button, progress bar, and profile picture', async () => {
    await render(TopBarComponent);

    expect(screen.getByTitle('Toggle sidebar')).toBeTruthy();
    expect(screen.getByAltText('profil')).toBeTruthy();
  });

  it('calls navbarService.toggleExtension() when the menu button is clicked', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(TopBarComponent);
    const service = fixture.debugElement.injector.get(NavbarService);
    const toggleSpy = vi.spyOn(service, 'toggleExtension');

    await user.click(screen.getByTitle('Toggle sidebar'));

    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });

  it('toggles the navbar state correctly through the service', async () => {
    const { fixture } = await render(TopBarComponent);
    const service = fixture.debugElement.injector.get(NavbarService);

    let state = false;
    service.isExtended$.subscribe(v => state = v);

    service.toggleExtension();
    expect(state).toBe(true);

    service.toggleExtension();
    expect(state).toBe(false);
  });
});
