import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPreparednessComponent } from './investor-preparedness.component';

describe('InvestorPreparednessComponent', () => {
  let component: InvestorPreparednessComponent;
  let fixture: ComponentFixture<InvestorPreparednessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorPreparednessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestorPreparednessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
