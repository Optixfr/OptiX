import { Routes } from '@angular/router';
import { FormSizeEyesPageComponent } from './pages/form-size-eyes-page/form-size-eyes-page.component';
import { FormTearsEyesPageComponent } from './pages/form-tears-eyes-page/form-tears-eyes-page.component';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { ToolPageComponent } from './pages/tool-page/tool-page.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';


export const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: 'accueil', component: FormSizeEyesPageComponent },
        { path: 'tears', component: FormTearsEyesPageComponent},
       // { path: 'report-generation', component: GenerationRapportPageComponent},
        { path: 'tools', component: ToolPageComponent},
        { path: '', redirectTo: '/accueil', pathMatch: 'full' }, 
      ]
    },
  
    {
      path: '',
      component: EmptyLayoutComponent,
      children: [
        { path: 'connexion', component: ConnexionPageComponent },
      ]
    },
  
    { path: '**', redirectTo: '/accueil' },
  ];
  
  