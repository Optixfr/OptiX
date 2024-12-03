import { Routes } from '@angular/router';
import { FormSizeEyesPageComponent } from './pages/form-size-eyes-page/form-size-eyes-page.component';
import { FormTearsEyesPageComponent } from './pages/form-tears-eyes-page/form-tears-eyes-page.component';
import { GenerationRapportPageComponent } from './pages/generation-rapport-page/generation-rapport-page.component';


export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }, 
    { path: 'accueil', component: FormSizeEyesPageComponent },
    { path: 'tears', component: FormTearsEyesPageComponent},
    { path: 'report-generation', component: GenerationRapportPageComponent},
    { path: '**', redirectTo: '/accueil' },
];
