import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectionFormComponent } from './sub-section-form.component';

describe('SubSectionFormComponent', () => {
  let component: SubSectionFormComponent;
  let fixture: ComponentFixture<SubSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSectionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
