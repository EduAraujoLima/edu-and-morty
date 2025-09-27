import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appCharacterStatus]',
  standalone: true,
})
export class CharacterStatusDirective {
  @Input('appCharacterStatus') status?: string | null;

  @HostBinding('class.bg-emerald-400') get isAlive(): boolean {
    return this.status === 'Alive';
  }

  @HostBinding('class.bg-red-400') get isDead(): boolean {
    return this.status === 'Dead';
  }

  @HostBinding('class.bg-gray-400') get isUnknown(): boolean {
    return this.status === 'unknown' || !this.status;
  }
}
