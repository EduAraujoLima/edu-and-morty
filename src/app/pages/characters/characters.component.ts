import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { FetchCharacters } from '../../core/state/character/characters.actions';
import { CharactersState } from '../../core/state/character/characters.state';
import { CharacterCard } from '../../shared/components/character-card/character-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AsyncPipe } from '@angular/common';
import { TextSearchForm } from '../../shared/components/text-search-form/text-search-form';
import { LoaderDirective } from '../../shared/directives/loader.directive';
import { FavoritesState } from '../../core/state/favorites/favorites.state';
import { CharacterWithFavorite } from '../../shared/types';
import {
  AddCharacterToFavorites,
  RemoveCharacterFromFavorites,
} from '../../core/state/favorites/favorites.actions';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { EmptyDirective } from '../../shared/directives/empty';

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
    EmptyDirective,
  ],
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
  $characterResponse = select(CharactersState.getCharacterResponse);
  $favoriteIds = select(FavoritesState.getFavoriteCharactersIds);

  $lastTextSearch = signal<string | null>(null);
  $pageIndex = signal(0);

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
    this.$lastTextSearch.set(text);
    this.$pageIndex.set(0);
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

  onPageChange(change: PageEvent) {
    this.$pageIndex.set(change.pageIndex);
    const name = this.$lastTextSearch();
    this.store.dispatch(
      new FetchCharacters({
        page: change.pageIndex + 1,
        ...(name && { name }),
      }),
    );
  }
}
