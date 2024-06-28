import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesSectionComponent } from './schedules-section.component';

describe('SchedulesSectionComponent', () => {
  let component: SchedulesSectionComponent;
  let fixture: ComponentFixture<SchedulesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
