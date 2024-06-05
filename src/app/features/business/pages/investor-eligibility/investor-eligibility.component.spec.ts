import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorEligibilityComponent } from './investor-eligibility.component';

describe('InvestorEligibilityComponent', () => {
  let component: InvestorEligibilityComponent;
  let fixture: ComponentFixture<InvestorEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorEligibilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestorEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
