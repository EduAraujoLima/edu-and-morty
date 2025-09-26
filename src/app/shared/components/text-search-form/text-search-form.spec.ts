import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSearchForm } from './text-search-form';

describe('TextSearchForm', () => {
  let component: TextSearchForm;
  let fixture: ComponentFixture<TextSearchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSearchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextSearchForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
