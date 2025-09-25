import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./characters.component').then((c) => c.CharactersComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./character-details/character-details').then((c) => c.CharacterDetailsComponent),
  },
];

export default routes;
