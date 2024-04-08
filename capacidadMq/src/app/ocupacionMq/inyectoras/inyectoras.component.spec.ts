import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InyectorasComponent } from './inyectoras.component';

describe('InyectorasComponent', () => {
  let component: InyectorasComponent;
  let fixture: ComponentFixture<InyectorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InyectorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InyectorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
