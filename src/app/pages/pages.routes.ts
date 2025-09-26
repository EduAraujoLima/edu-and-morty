import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/layout/layout').then((c) => c.Layout),
    children: [
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full',
      },
      {
        path: 'characters',
        loadChildren: () => import('./characters/character.routes'),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites').then((c) => c.Favorites),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default routes;
