import { TestBed } from '@angular/core/testing';

import { RickAndMortyApi } from './rick-and-morty-api.service';

describe('RickAndMortyApi', () => {
  let service: RickAndMortyApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickAndMortyApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
