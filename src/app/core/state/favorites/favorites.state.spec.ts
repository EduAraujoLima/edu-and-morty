import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { FavoritesState, FavoritesStateModel } from './favorites.state';
import { FavoritesAction } from './favorites.actions';

describe('Favorites store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([FavoritesState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: FavoritesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new FavoritesAction('item-1'));
    const actual = store.selectSnapshot(FavoritesState.getState);
    expect(actual).toEqual(expected);
  });

});
