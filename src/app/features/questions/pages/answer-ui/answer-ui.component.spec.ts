import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerUiComponent } from './answer-ui.component';

describe('AnswerUiComponent', () => {
  let component: AnswerUiComponent;
  let fixture: ComponentFixture<AnswerUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
