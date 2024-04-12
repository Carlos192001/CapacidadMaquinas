import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadMqComponent } from './capacidad-mq.component';

describe('CapacidadMqComponent', () => {
  let component: CapacidadMqComponent;
  let fixture: ComponentFixture<CapacidadMqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapacidadMqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacidadMqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
