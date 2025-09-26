import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block rounded-xl border border-neutral-800 bg-neutral-900 p-6 sm:p-10 text-center',
  },
})
export class NotFoundComponent {
  // Signal inputs
  title = input<string>('');
  subtitle = input<string>('');
}
