import { Routes } from '@angular/router';
import { HomePage } from './shared/pages/home-page/home-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    // Rutas hijas de la pagina main
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
