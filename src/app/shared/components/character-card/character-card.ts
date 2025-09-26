import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharacterWithFavorite } from '../../types';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCard {
  character = input.required<CharacterWithFavorite>();
  addToFavorites = output<number>();
  removeFromFavorites = output<number>();

  handleFavoriteClick() {
    const character = this.character();
    if (character.isFavorite) {
      return this.removeFromFavorites.emit(character.id);
    }
    this.addToFavorites.emit(character.id);
  }
}
