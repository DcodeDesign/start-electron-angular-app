import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from './interfaces/event.interface';
import { EventStatusEnum } from './enums/event-status.enum';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-event-edition',
  templateUrl: './event-edition.component.html',
  styleUrls: ['./event-edition.component.scss']
})
export class EventEditionComponent implements OnInit, OnChanges{

  @Input() date: Date;
  @Input() event: IEvent; 
  @Output() submitEvent = new EventEmitter<IEvent>(); 
  eventStatusEnum = EventStatusEnum

  options: string[];
  value: string;

  eventForm: FormGroup;
  filteredControlOptions$: Observable<string[]>;

  configEditor = {
    content_css : './custom-theme.css',
    content_style: "body { color: white; }",
    height : "400",
    selector: "textarea", // change this value according to your HTML
    skin: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "oxide-dark"
      : "oxide",
  }

  /* content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "default", */

  constructor(private fb: FormBuilder, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.getBranches().subscribe(branches => {
      this.options = branches.map(branch => branch.name);
      this.filteredControlOptions$ = of(this.options);
      this.filteredControlOptions$ = this.filteredOptions$();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  initForm() {
    this.eventForm = this.fb.group({
      uuid: [this.event?.uuid , Validators.required],
      date: [this.event?.date || this.date || null, Validators.required],
      branch: [this.event?.branch || null],
      text: [this.event?.text || null, Validators.required],
      hour: [this.event?.hour ||  new Date()],
      status: [this.event?.status || EventStatusEnum.TO_DO, Validators.required]
    });
  }

  getHeureActuelle(): string {
    const date = new Date();
    return date.toLocaleTimeString();
  }

  onSubmit() {
    if (this.eventForm && this.eventForm.valid) {
      const event = this.eventForm.value as IEvent;
      event.isNew = this.event.isNew;
      this.submitEvent.emit(event)
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filteredOptions$() {
    return this.eventForm.get('branch').valueChanges
                .pipe(
                  startWith(''),
                  map(filterString => this.filter(filterString)),
                );
  }
}
