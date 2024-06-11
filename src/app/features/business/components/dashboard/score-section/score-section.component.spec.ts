import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSectionComponent } from './score-section.component';

describe('ScoreSectionComponent', () => {
  let component: ScoreSectionComponent;
  let fixture: ComponentFixture<ScoreSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
