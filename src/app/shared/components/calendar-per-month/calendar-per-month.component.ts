import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { NbSortDirection } from '@nebular/theme';
import { IEvent } from '../event-edition-form/interfaces/event.interface';

@Component({
  selector: 'app-calendar-per-month',
  templateUrl: './calendar-per-month.component.html',
  styleUrls: ['./calendar-per-month.component.scss']
})
export class CalendarPerMonthComponent implements OnChanges{
  @Output() selectDay = new EventEmitter<any>()
  @Input() events: IEvent[] = []
  currentDate = this.normalizeDate(new Date());
  displayedColumns: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeksInMonth: ({date: Date, events?: IEvent[]} | null)[][];
  selectedDay: Date | null = this.normalizeDate(new Date());
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  parser: DOMParser;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.parser = new DOMParser();

    if(changes.events.currentValue)
      this.weeksInMonth = this.getWeeksInMonth();
  }

  getWeeksInMonth(): ({date: Date, events?: IEvent[]} | null)[][] {
    const weeks: ({date: Date, events?: IEvent[]} | null)[][] = [];
    let week: ({date: Date, events?: IEvent[]} | null)[] = [];
  
    const lastDay = this.normalizeDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0));
    const currentDay = this.normalizeDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1));
  
    for (let i = 0; i < currentDay.getDay(); i++) {
      week.push({ date: null, events: null });
    }
  
    while (currentDay <= lastDay) {
      if (week.length < 7) {
        week.push({ date: new Date(currentDay), events: this.getEvents(new Date(currentDay), 'desc') });
        currentDay.setDate(currentDay.getDate() + 1);
      } else {
        weeks.push(week);
        week = [];
      }
    }
  
    if (week.length > 0) {

      while (week.length < 7) {
        week.push({date: null, events: null});
      }
      weeks.push(week);
    }

    return weeks;
  }
  
  previousMonth(): void {
    this.currentDate = this.normalizeDate(new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1)));
    this.weeksInMonth = this.getWeeksInMonth();
  }

  nextMonth(): void {
    this.currentDate = this.normalizeDate(new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1)));
    this.weeksInMonth = this.getWeeksInMonth();
  }

  onSelectDay(date: Date | null): void {
    if (date) date = this.normalizeDate(date);

    this.selectedDay = date;
    this.selectDay.emit(this.selectedDay)
  }

  private normalizeDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private getEvents(date: Date, order: 'asc' | 'desc' = 'asc'): IEvent[] {
    return this.events
        .filter(item => item.date.toDateString() === date.toDateString())
        .sort((a, b) => this.compareEvents(a, b, order));
  }

  private compareEvents(a: IEvent, b: IEvent, order: 'asc' | 'desc'): number {
      const dateComparison = a.date.getTime() - b.date.getTime();
      if (dateComparison === 0) { 
          const hourComparison = a.hour.getTime() - b.hour.getTime();
          return order === 'asc' ? hourComparison : -hourComparison;
      }
      
      return order === 'asc' ? dateComparison : -dateComparison;
  }

  decodeEntities(str: string): string {
    // this prevents any overhead from creating the object each time
    const element = document.createElement('div');
    if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
  }

}

