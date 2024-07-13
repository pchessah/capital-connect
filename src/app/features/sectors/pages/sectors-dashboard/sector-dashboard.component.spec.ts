import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsDashboardComponent } from './sector-dashboard.component';

describe('SectorsDashboardComponent', () => {
  let component: SectorsDashboardComponent;
  let fixture: ComponentFixture<SectorsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
