import { ApiInfo } from './api-info.type';
import { Episode } from './episode.type';

export type EpisodesPageResponse = {
  info: ApiInfo;
  results: Episode[];
};
