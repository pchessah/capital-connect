import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubsectionComponent } from './create-subsection.component';

describe('CreateSubsectionComponent', () => {
  let component: CreateSubsectionComponent;
  let fixture: ComponentFixture<CreateSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
