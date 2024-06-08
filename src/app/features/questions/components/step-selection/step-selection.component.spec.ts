import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSelectionComponent } from './step-selection.component';

describe('StepSelectionComponent', () => {
  let component: StepSelectionComponent;
  let fixture: ComponentFixture<StepSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
