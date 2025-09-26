import {
  DestroyRef,
  Directive,
  inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Loader } from '../components/loader/loader';
import { LoaderService } from '../../core/services/loader.service';

@Directive({
  selector: '[appIfLoading]',
})
export class LoaderDirective implements OnInit {
  private loaderService = inject(LoaderService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.observeLoader();
  }

  observeLoader(): void {
    this.loaderService.isLoading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (isLoading) => {
        this.updateView(isLoading);
      },
    });
  }

  private updateView(isLoading: boolean): void {
    this.viewContainer.clear();

    if (isLoading) {
      this.viewContainer.createComponent(Loader);
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
