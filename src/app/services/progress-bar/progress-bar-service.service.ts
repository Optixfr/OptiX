import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  routeSteps: Record<string, number> = {
    '/accueil': 1,
    '/tears': 2,
    '/report-generation': 3
  };

  activeStep = 1; // Valeur par défaut de activeStep

  constructor(private router: Router) {
    // Écoute les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeStep = this.routeSteps[event.url] || 1;
        console.log('Active step:', this.activeStep);
      });
  }
}
