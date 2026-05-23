import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBarService } from '../../services/progress-bar/progress-bar-service.service';

@Component({ selector: 'mock-accueil', standalone: true, template: '<div>Accueil Page</div>' })
class MockAccueilComponent {}

@Component({ selector: 'mock-tears', standalone: true, template: '<div>Tears Page</div>' })
class MockTearsComponent {}

@Component({ selector: 'mock-report', standalone: true, template: '<div>Report Page</div>' })
class MockReportComponent {}

describe('ProgressBar Integration Tests (Bottom-Up Method)', () => {

  describe('ProgressBarService Unit Behavior', () => {
    it('should have initial activeStep as 1', async () => {
      const { fixture } = await render(ProgressBarComponent, {
        providers: [
          provideRouter([
            { path: 'accueil', component: MockAccueilComponent },
            { path: 'tears', component: MockTearsComponent },
            { path: 'report-generation', component: MockReportComponent }
          ])
        ]
      });
      const service = fixture.debugElement.injector.get(ProgressBarService);
      expect(service.activeStep()).toBe(1);
    });
  });

  describe('Interactive Stepper Navigation Flow', () => {
    async function setup() {
      const user = userEvent.setup();
      const renderResult = await render(ProgressBarComponent, {
        providers: [
          provideRouter([
            { path: 'accueil', component: MockAccueilComponent },
            { path: 'tears', component: MockTearsComponent },
            { path: 'report-generation', component: MockReportComponent },
            { path: '', redirectTo: 'accueil', pathMatch: 'full' }
          ])
        ]
      });
      const router = renderResult.fixture.debugElement.injector.get(Router);
      await renderResult.fixture.ngZone?.run(() => router.initialNavigation());
      renderResult.fixture.detectChanges();
      return { ...renderResult, user, router };
    }

    it('renders all 3 steps as material stepper headers', async () => {
      await setup();
      expect(screen.getByText('Etape 1')).toBeTruthy();
      expect(screen.getByText('Etape 2')).toBeTruthy();
      expect(screen.getByText('Etape 3')).toBeTruthy();
    });

    it('navigates from Etape 1 to Etape 2 when user clicks Etape 2 header', async () => {
      const { user, router, fixture } = await setup();
      const service = fixture.debugElement.injector.get(ProgressBarService);
      expect(service.activeStep()).toBe(1);

      const step2Header = screen.getByText('Etape 2').closest('.mat-step-header');
      expect(step2Header).toBeTruthy();

      await user.click(step2Header!);
      fixture.detectChanges();

      expect(router.url).toBe('/tears');
      expect(service.activeStep()).toBe(2);
    });

    it('navigates from Etape 2 to Etape 3 when user clicks Etape 3 header', async () => {
      const { user, router, fixture } = await setup();
      const service = fixture.debugElement.injector.get(ProgressBarService);

      const step2Header = screen.getByText('Etape 2').closest('.mat-step-header');
      await user.click(step2Header!);
      fixture.detectChanges();
      expect(router.url).toBe('/tears');
      expect(service.activeStep()).toBe(2);

      const step3Header = screen.getByText('Etape 3').closest('.mat-step-header');
      await user.click(step3Header!);
      fixture.detectChanges();

      expect(router.url).toBe('/report-generation');
      expect(service.activeStep()).toBe(3);
    });

    it('navigates backwards when user clicks a previous step header', async () => {
      const { user, router, fixture } = await setup();
      const service = fixture.debugElement.injector.get(ProgressBarService);

      const step3Header = screen.getByText('Etape 3').closest('.mat-step-header');
      await user.click(step3Header!);
      fixture.detectChanges();
      expect(router.url).toBe('/report-generation');
      expect(service.activeStep()).toBe(3);

      const step1Header = screen.getByText('Etape 1').closest('.mat-step-header');
      await user.click(step1Header!);
      fixture.detectChanges();

      expect(router.url).toBe('/accueil');
      expect(service.activeStep()).toBe(1);
    });
  });
});
