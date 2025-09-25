import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { GetCharacters } from '../../core/state/character/characters.actions';
import { CharactersState } from '../../core/state/character/characters.state';

@Component({
  selector: 'app-characters',
  imports: [],
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
  $characters = select(CharactersState.getCharacterList);

  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new GetCharacters({}));
  }
}
