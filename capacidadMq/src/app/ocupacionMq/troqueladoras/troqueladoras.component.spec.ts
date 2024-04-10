import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroqueladorasComponent } from './troqueladoras.component';

describe('TroqueladorasComponent', () => {
  let component: TroqueladorasComponent;
  let fixture: ComponentFixture<TroqueladorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TroqueladorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TroqueladorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
