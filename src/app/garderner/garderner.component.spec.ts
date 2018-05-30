import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardernerComponent } from './garderner.component';

describe('GardernerComponent', () => {
  let component: GardernerComponent;
  let fixture: ComponentFixture<GardernerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardernerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardernerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
