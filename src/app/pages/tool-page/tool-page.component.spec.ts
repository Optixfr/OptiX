import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { ToolPageComponent } from './tool-page.component';

describe('ToolPageComponent', () => {

  it('renders both tool cards', async () => {
    await render(ToolPageComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Lentilles rigides')).toBeTruthy();
    expect(screen.getByText('Lentilles souples')).toBeTruthy();
  });

  it('renders the correct descriptions for each card', async () => {
    await render(ToolPageComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Outil de traitement des lentilles rigides')).toBeTruthy();
    expect(screen.getByText('Outil de traitement des lentilles souples')).toBeTruthy();
  });

  it('renders exactly 2 card links', async () => {
    await render(ToolPageComponent, {
      providers: [provideRouter([])],
    });
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
  });
});
