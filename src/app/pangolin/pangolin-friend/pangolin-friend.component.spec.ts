import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinFriendComponent } from './pangolin-friend.component';

describe('PangolinFriendComponent', () => {
  let component: PangolinFriendComponent;
  let fixture: ComponentFixture<PangolinFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
