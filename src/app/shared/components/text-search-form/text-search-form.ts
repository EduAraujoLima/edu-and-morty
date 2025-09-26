import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-text-search-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './text-search-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSearchForm {
  nameControl = new FormControl<string | null>(null);

  @Output() textChange = this.nameControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
}
