import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () => import('./characters/character.routes'),
  },
  {
    path: 'locations',
    loadComponent: () => import('./locations/locations').then((c) => c.LocationsComponent),
  },
  {
    path: 'episodes',
    loadComponent: () => import('./episodes/episodes').then((c) => c.EpisodesComponent),
  },
];

export default routes;
