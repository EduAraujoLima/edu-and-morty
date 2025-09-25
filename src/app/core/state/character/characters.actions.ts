import { CharacterFilter } from '../../../shared/types';

export class GetCharacters {
  static readonly type = '[Characters] Get characters';
  constructor(public payload: CharacterFilter) {}
}
