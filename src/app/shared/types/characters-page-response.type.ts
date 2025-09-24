import { ApiInfo } from './api-info.type';
import { Character } from './character.type';

export type CharactersPageResponse = {
  info: ApiInfo;
  results: Character[];
};
