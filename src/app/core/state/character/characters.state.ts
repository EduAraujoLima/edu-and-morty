import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FetchCharacters } from './characters.actions';
import { CharactersPageResponse } from '../../../shared/types';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { catchError, of, tap } from 'rxjs';

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
  static getCharacterResponse(state: CharactersStateModel) {
    if (!state?.characterResponse) {
      return null;
    }
    return state.characterResponse;
  }

  @Action(FetchCharacters)
  add(ctx: StateContext<CharactersStateModel>, { payload }: FetchCharacters) {
    return this.apiService.getAllCharacters(payload).pipe(
      catchError(() =>
        of({
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        }),
      ),
      tap((res) => {
        ctx.patchState({
          characterResponse: res,
        });
      }),
    );
  }
}
