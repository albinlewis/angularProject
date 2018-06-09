import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantdetailsComponent } from './plantdetails.component';

describe('PlantdetailsComponent', () => {
  let component: PlantdetailsComponent;
  let fixture: ComponentFixture<PlantdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
