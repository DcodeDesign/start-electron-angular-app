import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, map, Observable } from 'rxjs';
import { IEvent } from '../components/event-edition-form/interfaces/event.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private eventsTable: Dexie.Table<IEvent, string>;

  constructor(private databaseService: DatabaseService) {
    this.eventsTable = this.databaseService.db.table('events');
  }

  createEvent(event: IEvent): Observable<string> {
    return from(this.eventsTable.add(event));
  }

  getEvents(dateFilter?: Date): Observable<IEvent[]> {
    let events$ = from(this.eventsTable.toArray());
    
    // Sort the events after fetching them from the database
    return events$.pipe(
      map(events => events.sort((a, b) => this.compareEvents(a, b, 'desc')))
    );
  }

  getEventPerDay(dateFilter: Date): Observable<IEvent[]> {
    let events$: Observable<IEvent[]>;
  
    const startOfDay = this.toMidnight(dateFilter);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
  
    events$ = from(this.eventsTable.where('date').between(startOfDay, endOfDay, true, false).toArray());
  
    // Sort the events after fetching them from the database
    return events$.pipe(
      map(events => events.sort((a, b) => this.compareEvents(a, b, 'desc')))
    );
  }

  getEventsPerMonth(dateFilter: Date): Observable<IEvent[]> {
    const startOfMonth = this.getStartOfMonth(dateFilter);
    const endOfMonth = this.getEndOfMonth(dateFilter);
  
    const events$ = from(this.eventsTable.where('date').between(startOfMonth, endOfMonth, true, false).toArray());
  
    // Trier les événements après les avoir récupérés de la base de données
    return events$.pipe(
      map(events => events.sort((a, b) => this.compareEvents(a, b, 'desc')))
    );
  }

  updateEvent(updatedEvent: IEvent): Observable<number> {
    return from(this.eventsTable.update(updatedEvent.uuid, updatedEvent));
  }

  deleteEvent(uuid: string): Observable<void> {
    return from(this.eventsTable.delete(uuid));
  }

  private toMidnight(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  private getStartOfMonth(date: Date): Date {
    const start = new Date(date);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  
  private getEndOfMonth(date: Date): Date {
    const end = new Date(date);
    end.setMonth(date.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
    return end;
  }
  
  private compareEvents(a: IEvent, b: IEvent, order: 'asc' | 'desc'): number {
    const dateComparison = a.date.getTime() - b.date.getTime();
  
    if (dateComparison === 0) { // if dates are the same
      const hourComparison = a.hour.getHours() - b.hour.getHours();
      const minuteComparison = a.hour.getMinutes() - b.hour.getMinutes();
      const secondComparison = a.hour.getSeconds() - b.hour.getSeconds();
  
      if (hourComparison === 0) {
        if (minuteComparison === 0) {
          return order === 'asc' ? secondComparison : -secondComparison;
        }
        return order === 'asc' ? minuteComparison : -minuteComparison;
      }
      return order === 'asc' ? hourComparison : -hourComparison;
    }
  
    return order === 'asc' ? dateComparison : -dateComparison;
  }
}
