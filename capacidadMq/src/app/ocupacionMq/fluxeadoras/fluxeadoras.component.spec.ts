import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxeadorasComponent } from './fluxeadoras.component';

describe('FluxeadorasComponent', () => {
  let component: FluxeadorasComponent;
  let fixture: ComponentFixture<FluxeadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluxeadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluxeadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
