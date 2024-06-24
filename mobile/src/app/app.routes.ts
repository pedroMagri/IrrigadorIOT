import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'horta',
    loadComponent: () => import('./horta-page/horta-page.component').then((m) => m.HortaPageComponent),
  },
  {
    path: '',
    redirectTo: 'horta',
    pathMatch: 'full',
  },
];
