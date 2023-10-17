import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { EventEditionWindowComponent } from '../event-edition-window/event-edition-window.component';
import { IEvent } from '../event-edition-form/interfaces/event.interface';
import { v4 as uuidv4 } from 'uuid';
import { EventStatusEnum } from '../event-edition-form/enums/event-status.enum';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() selectedDay: Date;
  @Input() events: IEvent[] = [];
  @Output() createdEvent =  new EventEmitter<IEvent>();
  @Output() editedEvent =  new EventEmitter<IEvent>();
  @Output() deletedEvent =  new EventEmitter<string>();

  constructor(private windowService: NbWindowService) { }

  editedEventWindow(event: IEvent = null) {
    const windowRef = this.windowService.open(EventEditionWindowComponent, {
      title: 'Edit Event',
      windowClass: "event-edition-window",
      context: {
        isNew: event?.uuid ? false : true,
        uuid : event?.uuid ? event.uuid : uuidv4(),
        date: event?.date ? event.date : this.selectedDay,
        text: event?.text ? event.text : null,
        branch: event?.branch ? event.branch : null,
        hour: event?.hour ? event.date : new Date(),
        status: event?.status ? event.status : EventStatusEnum.TO_DO
      },
    });

    windowRef.onClose.subscribe(event => {
        if (event) {
          if(event.isNew) {
            event.isNew = false;
            this.createdEvent.emit(event)
          } else {
            this.editedEvent.emit(event)
          }
        } 
    });
  }

  deleteEvent(eventUuid: string) {
    this.deletedEvent.emit(eventUuid)
  }
}
