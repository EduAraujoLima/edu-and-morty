import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import {
  AddCharacterToFavorites,
  FetchFavoriteCharacters,
  RemoveCharacterFromFavorites,
} from './favorites.actions';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { tap } from 'rxjs';
import { CharacterWithFavorite } from '../../../shared/types';

export interface FavoritesStateModel {
  favoriteCharacterIds: number[];
  favoriteCharacters: CharacterWithFavorite[];
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favoriteCharacterIds: [],
    favoriteCharacters: [],
  },
})
@Injectable()
export class FavoritesState {
  private readonly apiService = inject(RickAndMortyApiService);

  @Selector()
  static getFavoriteCharacters(state: FavoritesStateModel) {
    return state.favoriteCharacters;
  }

  @Selector()
  static getFavoriteCharactersIds(state: FavoritesStateModel) {
    return state.favoriteCharacterIds;
  }

  @Selector()
  static getFavoriteCharactersQuantity(state: FavoritesStateModel) {
    return state.favoriteCharacterIds.length;
  }

  @Action(FetchFavoriteCharacters)
  fetchFavoriteCharacters(ctx: StateContext<FavoritesStateModel>) {
    const stateModel = ctx.getState();

    if (!stateModel.favoriteCharacterIds.length) {
      return ctx.setState({
        favoriteCharacterIds: [],
        favoriteCharacters: [],
      });
    }

    return this.apiService.getMultipleCharacters(stateModel.favoriteCharacterIds).pipe(
      tap((res) => {
        ctx.patchState({
          favoriteCharacters: res.map((character) => ({
            ...character,
            isFavorite: true,
          })),
        });
      }),
    );
  }

  @Action(AddCharacterToFavorites)
  addFavoriteCharacter(
    ctx: StateContext<FavoritesStateModel>,
    { payload }: AddCharacterToFavorites,
  ) {
    const stateModel = ctx.getState();
    ctx.patchState({
      favoriteCharacterIds: [...stateModel.favoriteCharacterIds, payload],
    });
  }

  @Action(RemoveCharacterFromFavorites)
  removeFavoriteCharacter(
    ctx: StateContext<FavoritesStateModel>,
    { payload }: RemoveCharacterFromFavorites,
  ) {
    const stateModel = ctx.getState();
    ctx.patchState({
      favoriteCharacterIds: stateModel.favoriteCharacterIds.filter((id) => id !== payload),
      favoriteCharacters: stateModel.favoriteCharacters.filter(
        (character) => character.id !== payload,
      ),
    });
  }
}
