import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CharacterWithFavorite } from '../../types';
import { CharacterStatusDirective } from '../../directives/character-status.directive';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgOptimizedImage, CharacterStatusDirective],
  templateUrl: './character-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCard {
  character = input.required<CharacterWithFavorite>();
  addToFavorites = output<number>();
  removeFromFavorites = output<number>();
  selectCharacter = output<number>();

  handleFavoriteClick(event?: Event) {
    event?.stopPropagation();
    const c = this.character();
    if (c.isFavorite) {
      this.removeFromFavorites.emit(c.id);
      return;
    }
    this.addToFavorites.emit(c.id);
  }

  onCardClick() {
    const c = this.character();
    if (c?.id != null) {
      this.selectCharacter.emit(c.id);
    }
  }
}
