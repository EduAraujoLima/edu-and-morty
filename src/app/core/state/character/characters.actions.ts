import { CharacterFilter } from '../../../shared/types';

export class FetchCharacters {
  static readonly type = '[Characters] Fetch characters';
  constructor(public payload: CharacterFilter) {}
}
