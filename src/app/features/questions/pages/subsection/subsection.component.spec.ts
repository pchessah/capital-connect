import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectionComponent } from './subsection.component';

describe('SubSectionComponent', () => {
  let component: SubSectionComponent;
  let fixture: ComponentFixture<SubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
