import { Component } from '@angular/core';
import { IEvent } from '../../../shared/components/event-edition-form/interfaces/event.interface';
import { EventService } from '../../../shared/services/event.service';
import { tap} from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  selectedDay = new Date();
  eventsPerDay: IEvent[];
  eventsPerMonth: IEvent[];

  constructor(private eventService: EventService) { }
  
  ngOnInit(): void {
    this.onSelectedDay(this.selectedDay);
  }

  onSelectedDay($event: Date) {
    this.selectedDay = $event;
    this.eventService.getEventsPerMonth(this.selectedDay).subscribe(eventsPerMonth => {
      this.eventsPerMonth = eventsPerMonth;
      this.eventsPerDay = eventsPerMonth.filter(item => item.date.toDateString() === this.selectedDay.toDateString())
    });
  }

  onCreatedEvent(event: IEvent) {
    this.eventService.createEvent(event)
                     .pipe(tap(() => this.onSelectedDay(this.selectedDay)))
                     .subscribe();
  }

  onDeletedEvent(eventUuid: string) {
    this.eventService.deleteEvent(eventUuid)
                     .pipe(tap(() => this.onSelectedDay(this.selectedDay)))
                     .subscribe();
  }

  onEditedEvent(event: IEvent) {
    this.eventService.updateEvent(event)
                     .pipe(tap(() => this.onSelectedDay(this.selectedDay)))
                     .subscribe();
  }
}
