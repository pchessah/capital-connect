import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedResponseComponent } from './saved-response.component';

describe('SavedResponseComponent', () => {
  let component: SavedResponseComponent;
  let fixture: ComponentFixture<SavedResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
