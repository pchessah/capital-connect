import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUiComponent } from './question-ui.component';

describe('QuestionUiComponent', () => {
  let component: QuestionUiComponent;
  let fixture: ComponentFixture<QuestionUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
