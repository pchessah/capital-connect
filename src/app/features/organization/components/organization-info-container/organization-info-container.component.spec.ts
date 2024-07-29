import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInfoContainerComponent } from './organization-info-container.component';

describe('OrganizationInfoContainerComponent', () => {
  let component: OrganizationInfoContainerComponent;
  let fixture: ComponentFixture<OrganizationInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationInfoContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
