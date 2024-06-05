import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLayoutComponent } from './success-layout.component';

describe('SuccessLayoutComponent', () => {
  let component: SuccessLayoutComponent;
  let fixture: ComponentFixture<SuccessLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
