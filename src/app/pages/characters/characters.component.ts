import { Component, computed, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { FetchCharacters } from '../../core/state/character/characters.actions';
import { CharactersState } from '../../core/state/character/characters.state';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AsyncPipe } from '@angular/common';
import { TextSearchForm } from '../../shared/components/text-search-form/text-search-form';
import { LoaderDirective } from '../../shared/components/loader/loader.directive';
import { FavoritesState } from '../../core/state/favorites/favorites.state';
import { CharacterWithFavorite } from '../../shared/types';
import {
  AddCharacterToFavorites,
  RemoveCharacterFromFavorites,
} from '../../core/state/favorites/favorites.actions';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BreakpointService } from '../../core/services/breakpoint.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CharacterCard,
    MatGridListModule,
    AsyncPipe,
    TextSearchForm,
    LoaderDirective,
    MatPaginatorModule,
  ],
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
  $characterResponse = select(CharactersState.getCharacterResponse);
  $favoriteIds = select(FavoritesState.getFavoriteCharactersIds);

  readonly cols$ = inject(BreakpointService).cols$;

  $charactersWithFavorite = computed<CharacterWithFavorite[]>(() => {
    const characters = this.$characterResponse();
    const favorites = this.$favoriteIds();
    if (!characters) {
      return [];
    }
    return characters.results.map((character) => ({
      ...character,
      isFavorite: favorites.includes(character.id),
    }));
  });

  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new FetchCharacters({}));
  }

  onTextChange(text: string | null) {
    this.store.dispatch(
      new FetchCharacters({
        ...(text && { name: text }),
      }),
    );
  }

  onAddFavorite(id: number) {
    this.store.dispatch(new AddCharacterToFavorites(id));
  }

  onRemoveFavorite(id: number) {
    this.store.dispatch(new RemoveCharacterFromFavorites(id));
  }
}
