import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSpaceComponent } from './advertisement-space.component';

describe('AdvertisementSpaceComponent', () => {
  let component: AdvertisementSpaceComponent;
  let fixture: ComponentFixture<AdvertisementSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
