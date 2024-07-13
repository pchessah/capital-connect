import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectorComponent } from './edit-sector.component';

describe('EditSectorComponent', () => {
  let component: EditSectorComponent;
  let fixture: ComponentFixture<EditSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
