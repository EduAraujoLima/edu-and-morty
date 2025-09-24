import { ApiInfo } from './api-info.type';
import { Location } from './location.type';

export type LocationsPageResponse = {
  info: ApiInfo;
  results: Location[];
};
