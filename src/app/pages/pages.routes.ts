import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/layout/layout').then((c) => c.Layout),
    children: [
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
];

export default routes;
