import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CharacterWithFavorite } from '../../types';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './character-card.html',
  styleUrls: ['./character-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCard {
  character = input.required<CharacterWithFavorite>();
  addToFavorites = output<number>();
  removeFromFavorites = output<number>();

  handleFavoriteClick() {
    const c = this.character();
    if (c.isFavorite) {
      this.removeFromFavorites.emit(c.id);
      return;
    }
    this.addToFavorites.emit(c.id);
  }
}
