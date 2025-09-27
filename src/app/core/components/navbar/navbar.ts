import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { select } from '@ngxs/store';
import { FavoritesState } from '../../state/favorites/favorites.state';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  private translateService = inject(TranslateService);
  readonly $favorites = select(FavoritesState.getFavoriteCharactersQuantity);

  changeLang(lang: Lang) {
    this.translateService.use(lang);
  }
}

type Lang = 'pt-br' | 'en';
