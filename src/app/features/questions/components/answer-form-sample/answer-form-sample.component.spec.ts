import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFormSampleComponent } from './answer-form-sample.component';

describe('AnswerFormSampleComponent', () => {
  let component: AnswerFormSampleComponent;
  let fixture: ComponentFixture<AnswerFormSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerFormSampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerFormSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
