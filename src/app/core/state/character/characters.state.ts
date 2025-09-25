import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetCharacters } from './characters.actions';
import { CharactersPageResponse } from '../../../shared/types';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api';
import { tap } from 'rxjs';

export interface CharactersStateModel {
  characterResponse: CharactersPageResponse | null;
}

@State<CharactersStateModel>({
  name: 'characters',
  defaults: {
    characterResponse: null,
  },
})
@Injectable()
export class CharactersState {
  private readonly apiService = inject(RickAndMortyApiService);

  @Selector()
  static getCharacterList(state: CharactersStateModel) {
    if (!state?.characterResponse) {
      return [];
    }
    return state.characterResponse?.results;
  }

  @Action(GetCharacters)
  add(ctx: StateContext<CharactersStateModel>, { payload }: GetCharacters) {
    return this.apiService.getAllCharacters(payload).pipe(
      tap((res) => {
        ctx.patchState({
          characterResponse: res,
        });
      }),
    );
  }
}
