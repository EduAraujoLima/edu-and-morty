import { Component, inject, input, OnInit } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { FetchCharacterById } from '../../../core/state/character/characters.actions';
import { CharactersState } from '../../../core/state/character/characters.state';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LoaderDirective } from '../../../shared/directives/loader.directive';
import { EmptyDirective } from '../../../shared/directives/empty.directive';
import { MatButtonModule } from '@angular/material/button';
import { CharacterStatusDirective } from '../../../shared/directives/character-status.directive';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [TranslatePipe, RouterLink, LoaderDirective, EmptyDirective, MatButtonModule, CharacterStatusDirective],
  templateUrl: './character-details.html',
})
export class CharacterDetailsComponent implements OnInit {
  id = input.required<string>();

  private store = inject(Store);

  $character = select(CharactersState.getSelectedCharacter);
  $episodes = select(CharactersState.getSelectedCharacterEpisodes);

  ngOnInit(): void {
    const idValue = this.id();
    const parsed = Number(idValue);
    if (idValue && Number.isFinite(parsed)) {
      this.store.dispatch(new FetchCharacterById(parsed));
    }
  }
}
