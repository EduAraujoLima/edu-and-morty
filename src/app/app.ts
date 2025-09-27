import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class App implements OnInit {
  private translateService = inject(TranslateService);
  ngOnInit(): void {
    this.translateService.addLangs(['pt-br', 'en']);
    this.translateService.use('pt-br');
  }
}
