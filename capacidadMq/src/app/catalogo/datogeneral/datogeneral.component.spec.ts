import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatogeneralComponent } from './datogeneral.component';

describe('DatogeneralComponent', () => {
  let component: DatogeneralComponent;
  let fixture: ComponentFixture<DatogeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatogeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatogeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
