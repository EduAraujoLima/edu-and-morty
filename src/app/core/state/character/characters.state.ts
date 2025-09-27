import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FetchCharacters, FetchCharacterById } from './characters.actions';
import { Character, CharactersPageResponse, Episode } from '../../../shared/types';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { catchError, of, tap, switchMap } from 'rxjs';

export interface CharactersStateModel {
  characterResponse: CharactersPageResponse | null;
  selectedCharacter: Character | null;
  selectedCharacterEpisodes: Episode[];
}

@State<CharactersStateModel>({
  name: 'characters',
  defaults: {
    characterResponse: null,
    selectedCharacter: null,
    selectedCharacterEpisodes: [],
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

  @Selector()
  static getSelectedCharacter(state: CharactersStateModel) {
    return state.selectedCharacter;
  }

  @Selector()
  static getSelectedCharacterEpisodes(state: CharactersStateModel) {
    return state.selectedCharacterEpisodes;
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

  @Action(FetchCharacterById)
  fetchById(ctx: StateContext<CharactersStateModel>, { payload }: FetchCharacterById) {
    return this.apiService.getCharacter(payload).pipe(
      switchMap((character) => {
        ctx.patchState({
          selectedCharacter: character,
          selectedCharacterEpisodes: [],
        });

        const episodeIds = (character?.episode || [])
          .map((url) => {
            const idStr = url.split('/').pop() || '';
            const id = Number(idStr);
            return Number.isFinite(id) ? id : null;
          })
          .filter((v): v is number => v !== null);

        if (!episodeIds.length) {
          return of([] as Episode[]);
        }
        return this.apiService.getMultipleEpisodes(episodeIds);
      }),
      tap((episodes) => {
        ctx.patchState({ selectedCharacterEpisodes: episodes });
      }),
      catchError(() => {
        ctx.patchState({
          selectedCharacter: null,
          selectedCharacterEpisodes: [],
        });
        return of([] as Episode[]);
      }),
    );
  }
}
