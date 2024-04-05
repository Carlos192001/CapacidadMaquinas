import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularCapacidadComponent } from './calcular-capacidad.component';

describe('CalcularCapacidadComponent', () => {
  let component: CalcularCapacidadComponent;
  let fixture: ComponentFixture<CalcularCapacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcularCapacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcularCapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
