import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { ToolCardComponent } from './tool-card.component';

describe('ToolCardComponent', () => {

  async function setup(overrides: { title?: string; description?: string; link?: string } = {}) {
    return render(ToolCardComponent, {
      inputs: {
        title: overrides.title ?? 'Ma Carte',
        description: overrides.description ?? 'Une description',
        link: overrides.link ?? '/accueil',
      },
      providers: [provideRouter([])],
    });
  }

  it('displays the title', async () => {
    await setup({ title: 'Lentilles Rigides' });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Lentilles Rigides');
  });

  it('displays the description', async () => {
    await setup({ description: 'Outil de traitement des lentilles rigides' });
    expect(screen.getByText('Outil de traitement des lentilles rigides')).toBeTruthy();
  });

  it('renders an anchor with the correct routerLink', async () => {
    await setup({ link: '/tools' });
    const anchor = screen.getByRole('link') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('/tools');
  });

  it('uses fallback default values when no inputs are provided', async () => {
    // Render without inputs to test defaults
    await render(ToolCardComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Carte 1');
    expect(screen.getByText('Description 1')).toBeTruthy();
  });
});
