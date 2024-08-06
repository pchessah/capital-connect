import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactAssessmentComponent } from './impact-assessment.component';

describe('ImpactAssessmentComponent', () => {
  let component: ImpactAssessmentComponent;
  let fixture: ComponentFixture<ImpactAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpactAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
