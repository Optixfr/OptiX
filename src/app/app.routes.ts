import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'accueil',
        loadComponent: () =>
          import('./pages/form-size-eyes-page/form-size-eyes-page.component').then(
            (m) => m.FormSizeEyesPageComponent
          ),
      },
      {
        path: 'tears',
        loadComponent: () =>
          import('./pages/form-tears-eyes-page/form-tears-eyes-page.component').then(
            (m) => m.FormTearsEyesPageComponent
          ),
      },
      {
        path: 'report-generation',
        loadComponent: () =>
          import('./pages/generation-rapport-page/generation-rapport-page.component').then(
            (m) => m.GenerationRapportPageComponent
          ),
      },
      {
        path: 'tools',
        loadComponent: () =>
          import('./pages/tool-page/tool-page.component').then(
            (m) => m.ToolPageComponent
          ),
      },
      { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    ],
  },

  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'connexion',
        loadComponent: () =>
          import('./pages/connexion-page/connexion-page.component').then(
            (m) => m.ConnexionPageComponent
          ),
      },
    ],
  },

  { path: '**', redirectTo: '/accueil' },
];