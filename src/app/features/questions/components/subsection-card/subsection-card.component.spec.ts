import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsectionCardComponent } from './subsection-card.component';

describe('SubsectionCardComponent', () => {
  let component: SubsectionCardComponent;
  let fixture: ComponentFixture<SubsectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsectionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
