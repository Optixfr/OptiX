import { Injectable, signal, computed } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  readonly routeSteps: Record<string, number> = {
    '/accueil': 1,
    '/tears': 2,
    '/report-generation': 3
  };

  private readonly currentUrl = signal<string>('/accueil');

  readonly activeStep = computed(() => {
    return this.routeSteps[this.currentUrl()] || 1;
  });

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        const cleanUrl = url.split('?')[0].split('#')[0];
        
        let foundPath = '/accueil';
        for (const path of Object.keys(this.routeSteps)) {
          if (cleanUrl === path || cleanUrl === `/OptiX${path}` || cleanUrl.endsWith(path)) {
            foundPath = path;
            break;
          }
        }
        this.currentUrl.set(foundPath);
      });
  }

  setStep(step: number) {
    const matchingPath = Object.keys(this.routeSteps).find(
      (path) => this.routeSteps[path] === step
    );
    if (matchingPath) {
      this.currentUrl.set(matchingPath);
      this.router.navigateByUrl(matchingPath);
    }
  }
}
