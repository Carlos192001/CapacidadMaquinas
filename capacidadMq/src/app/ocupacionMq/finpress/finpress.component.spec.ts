import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinpressComponent } from './finpress.component';

describe('FinpressComponent', () => {
  let component: FinpressComponent;
  let fixture: ComponentFixture<FinpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinpressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
