import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarCalculosComponent } from './realizar-calculos.component';

describe('RealizarCalculosComponent', () => {
  let component: RealizarCalculosComponent;
  let fixture: ComponentFixture<RealizarCalculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizarCalculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarCalculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
