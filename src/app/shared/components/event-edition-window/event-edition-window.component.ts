import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { IEvent } from '../event-edition-form/interfaces/event.interface';

@Component({
  selector: 'app-event-edition-window',
  templateUrl: './event-edition-window.component.html',
  styleUrls: ['./event-edition-window.component.scss']
})
export class EventEditionWindowComponent implements OnInit{
  event: IEvent;

  constructor(
    protected windowRef: NbWindowRef,
  ) { }

  ngOnInit(): void {
    this.event = (this.windowRef.config.context as IEvent)
  }

  onSubmitEvent($event: any) {
    this.windowRef.close($event)
  }
}
