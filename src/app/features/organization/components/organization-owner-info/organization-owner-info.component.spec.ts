import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationOwnerInfoComponent } from './organization-owner-info.component';

describe('OrganizationOwnerInfoComponent', () => {
  let component: OrganizationOwnerInfoComponent;
  let fixture: ComponentFixture<OrganizationOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationOwnerInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
