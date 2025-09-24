import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Character,
  CharactersPageResponse,
  CharacterFilter,
  CharacterId,
  CharacterIds,
  Episode,
  EpisodesPageResponse,
  EpisodeFilter,
  EpisodeId,
  EpisodeIds,
  Location,
  LocationsPageResponse,
  LocationFilter,
  LocationId,
  LocationIds,
} from '../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyApiService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  private readonly http = inject(HttpClient);

  // Helpers
  private buildHttpParams(
    filters?: Record<string, string | number | boolean | undefined>,
  ): HttpParams | undefined {
    if (!filters) return undefined;
    return Object.entries(filters).reduce((params, [key, value]) => {
      return value !== undefined && value !== null && value !== ''
        ? params.set(key, String(value))
        : params;
    }, new HttpParams());
  }

  // Character endpoints
  getAllCharacters(filters?: CharacterFilter): Observable<CharactersPageResponse> {
    const params = this.buildHttpParams(filters);
    return this.http.get<CharactersPageResponse>(`${this.baseUrl}/character`, { params });
  }

  getCharacter(id: CharacterId): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getMultipleCharacters(ids: CharacterIds): Observable<Character[]> {
    const path = ids.join(',');
    return this.http
      .get<Character | Character[]>(`${this.baseUrl}/character/${path}`)
      .pipe(map((res) => (Array.isArray(res) ? res : [res])));
  }

  // Location endpoints
  getAllLocations(filters?: LocationFilter): Observable<LocationsPageResponse> {
    const params = this.buildHttpParams(filters);
    return this.http.get<LocationsPageResponse>(`${this.baseUrl}/location`, { params });
  }

  getLocation(id: LocationId): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`);
  }

  getMultipleLocations(ids: LocationIds): Observable<Location[]> {
    const path = ids.join(',');
    return this.http
      .get<Location | Location[]>(`${this.baseUrl}/location/${path}`)
      .pipe(map((res) => (Array.isArray(res) ? res : [res])));
  }

  // Episode endpoints
  getAllEpisodes(filters?: EpisodeFilter): Observable<EpisodesPageResponse> {
    const params = this.buildHttpParams(filters);
    return this.http.get<EpisodesPageResponse>(`${this.baseUrl}/episode`, { params });
  }

  getEpisode(id: EpisodeId): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }

  getMultipleEpisodes(ids: EpisodeIds): Observable<Episode[]> {
    const path = ids.join(',');
    return this.http
      .get<Episode | Episode[]>(`${this.baseUrl}/episode/${path}`)
      .pipe(map((res) => (Array.isArray(res) ? res : [res])));
  }
}
