import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubsectionComponent } from './edit-subsection.component';

describe('EditSubsectionComponent', () => {
  let component: EditSubsectionComponent;
  let fixture: ComponentFixture<EditSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
