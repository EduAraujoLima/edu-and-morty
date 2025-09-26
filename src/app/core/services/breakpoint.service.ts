import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);

  cols$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map((state) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          return 1;
        }
        if (state.breakpoints[Breakpoints.Small]) {
          return 2;
        }
        return 3;
      }),
      startWith(3),
    );
}
