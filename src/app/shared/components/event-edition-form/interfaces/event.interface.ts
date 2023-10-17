import { EventStatusEnum } from "../enums/event-status.enum";

export interface IEvent {
  uuid: string;
  date: Date;
  text: string;
  branch?: string;
  hour?: Date;
  status: EventStatusEnum;
  isNew?: boolean
}