import {
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { NotFoundComponent } from '../components/not-found/not-found';

@Directive({
  selector: '[appEmpty]',
  standalone: true,
})
export class EmptyDirective implements OnChanges {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  @Input('appEmpty') data: unknown;
  @Input('appEmptyCustomTemplate') customTemplate?: TemplateRef<unknown>;
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView(): void {
    const isEmpty = this.isEmptyValue(this.data);

    this.viewContainer.clear();

    if (isEmpty) {
      const ref: ComponentRef<NotFoundComponent> =
        this.viewContainer.createComponent(NotFoundComponent);
      if (this.title) {
        ref.setInput('title', this.title);
      }
      if (this.subtitle) {
        ref.setInput('subtitle', this.subtitle);
      }
      if (this.customTemplate) {
        ref.setInput('customTemplate', this.customTemplate);
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private isEmptyValue(value: unknown): boolean {
    if (!value) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return false;
  }
}
