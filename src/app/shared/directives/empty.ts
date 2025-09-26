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

      const title = this.title || 'Nada foi encontrado';
      const subtitle = this.subtitle || 'Tente realizar uma nova busca';

      const ref: ComponentRef<NotFoundComponent> = this.viewContainer.createComponent(
        NotFoundComponent,
        {
          projectableNodes,
        },
      );

      ref.setInput('title', title);
      ref.setInput('subtitle', subtitle);
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
