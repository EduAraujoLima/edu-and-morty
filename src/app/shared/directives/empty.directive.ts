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

  @Input('appEmpty') data: unknown[] | null | undefined;
  @Input('appEmptyCustomTemplate') customTemplate?: TemplateRef<unknown>;
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView(): void {
    const isEmpty = !this.data || this.data.length === 0;

    this.viewContainer.clear();

    if (isEmpty) {
      let projectableNodes: Node[][] = [];

      if (this.customTemplate) {
        const customView = this.customTemplate.createEmbeddedView({});
        projectableNodes = [customView.rootNodes];
      }

      const ref: ComponentRef<NotFoundComponent> = this.viewContainer.createComponent(
        NotFoundComponent,
        {
          projectableNodes,
        },
      );
      if (this.title) {
        ref.setInput('title', this.title);
      }
      if (this.subtitle) {
        ref.setInput('subtitle', this.subtitle);
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
