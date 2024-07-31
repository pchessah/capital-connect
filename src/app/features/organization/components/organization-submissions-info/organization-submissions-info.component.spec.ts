import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSubmissionsInfoComponent } from './organization-submissions-info.component';

describe('OrganizationSubmissionsInfoComponent', () => {
  let component: OrganizationSubmissionsInfoComponent;
  let fixture: ComponentFixture<OrganizationSubmissionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationSubmissionsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationSubmissionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
