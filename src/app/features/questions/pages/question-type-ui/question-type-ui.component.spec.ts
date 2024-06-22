import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeUiComponent } from './question-type-ui.component';

describe('QuestionTypeUiComponent', () => {
  let component: QuestionTypeUiComponent;
  let fixture: ComponentFixture<QuestionTypeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionTypeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
