import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeTemplateComponent } from './welcome-template.component';

describe('WelcomeTemplateComponent', () => {
  let component: WelcomeTemplateComponent;
  let fixture: ComponentFixture<WelcomeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
