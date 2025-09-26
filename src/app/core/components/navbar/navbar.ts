import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { select } from '@ngxs/store';
import { FavoritesState } from '../../state/favorites/favorites.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly $favorites = select(FavoritesState.getFavoriteCharactersQuantity);
}
