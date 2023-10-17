import { Component, Input } from '@angular/core';
import { EventStatusEnum } from '../event-edition-form/enums/event-status.enum';

@Component({
  selector: 'app-event-badges',
  templateUrl: './event-badges.component.html',
  styleUrls: ['./event-badges.component.scss']
})
export class EventBadgesComponent {
  @Input() eventStatus: EventStatusEnum;
  @Input() showText = true;
  @Input() tooltip: string;
  eventStatusEnum = EventStatusEnum;

  constructor() {}
}
