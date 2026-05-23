import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {

  it('renders the lateral navbar', async () => {
    await render(MainLayoutComponent, {
      providers: [provideRouter([])],
    });
    // Navbar renders the menu SVG (from top-bar)
    expect(screen.getByAltText('menu')).toBeTruthy();
  });

  it('renders the top bar', async () => {
    await render(MainLayoutComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByTitle('Toggle sidebar')).toBeTruthy();
  });

  it('renders the router outlet slot', async () => {
    await render(MainLayoutComponent, {
      providers: [provideRouter([])],
    });
    // The shell element should exist in the DOM
    expect(document.querySelector('router-outlet')).toBeTruthy();
  });
});
