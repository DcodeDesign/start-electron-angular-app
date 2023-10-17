import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBadgesComponent } from './event-badges.component';

describe('EventBadgesComponent', () => {
  let component: EventBadgesComponent;
  let fixture: ComponentFixture<EventBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
