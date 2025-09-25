import { ApiInfo } from './api-info.type';

export type PageResponse<T> = {
  info: ApiInfo;
  results: T[];
};

export type FilterPage = {
  page: number;
};

export type RequestFilters<T, K extends keyof T> = Partial<
  FilterPage & {
    [key in K]: T[key];
  }
>;
