import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { LoaderService } from '../../core/services/loader.service';

@Directive({
  selector: '[appDisableControlOnLoad]',
})
export class DisableControlOnLoadDirective implements OnInit {
  private loaderService = inject(LoaderService);
  private ngControl = inject(NgControl, { self: true });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.observeLoader();
  }

  private observeLoader(): void {
    this.loaderService.isLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => {
        this.updateControlState(isLoading);
      });
  }

  private updateControlState(isLoading: boolean): void {
    const control = this.ngControl.control;

    if (!control) {
      return;
    }

    if (isLoading) {
      return control.disable();
    }

    control.enable();
  }
}
