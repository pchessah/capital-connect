import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSubsectionUiComponent } from './question-subsection-ui.component';

describe('QuestionSubsectionUiComponent', () => {
  let component: QuestionSubsectionUiComponent;
  let fixture: ComponentFixture<QuestionSubsectionUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSubsectionUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionSubsectionUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
