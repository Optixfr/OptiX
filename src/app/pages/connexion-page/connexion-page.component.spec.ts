import { render, screen } from '@testing-library/angular';
import { ConnexionPageComponent } from './connexion-page.component';

describe('ConnexionPageComponent', () => {

  it('renders the login form heading', async () => {
    await render(ConnexionPageComponent);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Connectez vous');
  });

  it('renders email and password inputs', async () => {
    await render(ConnexionPageComponent);
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Mot de passe')).toBeTruthy();
  });

  it('renders the submit button', async () => {
    await render(ConnexionPageComponent);
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeTruthy();
  });

  it('renders the forgot password link', async () => {
    await render(ConnexionPageComponent);
    expect(screen.getByText('Mot de passe oublié ?')).toBeTruthy();
  });

  it('renders the sign-up link', async () => {
    await render(ConnexionPageComponent);
    expect(screen.getByText('Inscrivez-vous')).toBeTruthy();
  });

  it('email input has correct type', async () => {
    await render(ConnexionPageComponent);
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    expect(emailInput.type).toBe('email');
  });

  it('password input has correct type', async () => {
    await render(ConnexionPageComponent);
    const passwordInput = screen.getByLabelText('Mot de passe') as HTMLInputElement;
    expect(passwordInput.type).toBe('password');
  });
});
