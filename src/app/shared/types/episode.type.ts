import { PageResponse, RequestFilters } from './utils.type';

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type EpisodesPageResponse = PageResponse<Episode>;

export type EpisodeFilter = RequestFilters<Episode, 'name' | 'episode'>;
