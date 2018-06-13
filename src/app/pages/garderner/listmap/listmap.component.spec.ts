import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmapComponent } from './listmap.component';

describe('ListmapComponent', () => {
  let component: ListmapComponent;
  let fixture: ComponentFixture<ListmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
