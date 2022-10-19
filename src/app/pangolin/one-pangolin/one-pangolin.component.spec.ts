import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePangolinComponent } from './one-pangolin.component';

describe('OnePangolinComponent', () => {
  let component: OnePangolinComponent;
  let fixture: ComponentFixture<OnePangolinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePangolinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
