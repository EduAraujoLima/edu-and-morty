import { CharacterFilter } from '../../../shared/types';

export class FetchCharacters {
  static readonly type = '[Characters] Fetch characters';
  constructor(public payload: CharacterFilter) {}
}

export class FetchCharacterById {
  static readonly type = '[Characters] Fetch character by id';
  constructor(public payload: number) {}
}
