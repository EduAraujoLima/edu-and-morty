import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { FavoritesState } from '../../core/state/favorites/favorites.state';
import {
  FetchFavoriteCharacters,
  RemoveCharacterFromFavorites,
} from '../../core/state/favorites/favorites.actions';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { LoaderDirective } from '../../shared/components/loader/loader.directive';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, MatGridListModule, CharacterCard, LoaderDirective],
  templateUrl: './favorites.html',
  host: {
    class: 'mt-8 block',
  },
})
export class Favorites implements OnInit {
  $favorites = select(FavoritesState.getFavoriteCharacters);

  private store = inject(Store);
  readonly cols$ = inject(BreakpointService).cols$;

  ngOnInit(): void {
    this.store.dispatch(new FetchFavoriteCharacters());
  }

  removeFavoriteCharacter(id: number) {
    this.store.dispatch(new RemoveCharacterFromFavorites(id));
  }
}
