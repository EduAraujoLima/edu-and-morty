import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { CharactersState, CharactersStateModel } from '../characters.state';
import { CharactersAction } from '../characters.actions';

describe('Characters store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([CharactersState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: CharactersStateModel = {
      items: ['item-1'],
    };
    store.dispatch(new CharactersAction('item-1'));
    const actual = store.selectSnapshot(CharactersState.getState);
    expect(actual).toEqual(expected);
  });
});
