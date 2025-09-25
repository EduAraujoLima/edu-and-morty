import { PageResponse, RequestFilters } from './utils.type';

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export type LocationsPageResponse = PageResponse<Location>;

export type LocationFilter = RequestFilters<Location, 'name' | 'type' | 'dimension'>;
