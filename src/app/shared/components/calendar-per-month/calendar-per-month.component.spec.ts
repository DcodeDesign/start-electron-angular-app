import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPerMonthComponent } from './calendar-per-month.component';

describe('CalendarPerMonthComponent', () => {
  let component: CalendarPerMonthComponent;
  let fixture: ComponentFixture<CalendarPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
