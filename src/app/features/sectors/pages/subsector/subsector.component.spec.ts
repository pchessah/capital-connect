import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectorComponent } from './subsector.component';

describe('SubSectorComponent', () => {
  let component: SubSectorComponent;
  let fixture: ComponentFixture<SubSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
