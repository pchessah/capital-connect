import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUiContainerComponent } from './admin-ui-container.component';

describe('AdminUiContainerComponent', () => {
  let component: AdminUiContainerComponent;
  let fixture: ComponentFixture<AdminUiContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUiContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
