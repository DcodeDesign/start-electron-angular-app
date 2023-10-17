import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditionWindowComponent } from './event-edition-window.component';

describe('EventEditionWindowComponent', () => {
  let component: EventEditionWindowComponent;
  let fixture: ComponentFixture<EventEditionWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEditionWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEditionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
