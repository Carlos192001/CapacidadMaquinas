import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HornosComponent } from './hornos.component';

describe('HornosComponent', () => {
  let component: HornosComponent;
  let fixture: ComponentFixture<HornosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HornosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HornosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
