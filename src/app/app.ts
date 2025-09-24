import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="text-3xl font-bold underline text-red-600">Hello world!</h1>
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('edu-and-morty');
}
