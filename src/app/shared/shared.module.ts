import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbTreeGridModule, NbTableModule, NbButtonModule, NbTabsetModule, NbAutocompleteModule, NbCardModule, NbAccordionModule, NbIconModule, NbSelectModule, NbBadgeModule, NbInputModule, NbTimepickerModule, NbDatepickerModule, NbListModule, NbTooltipModule, NbLayoutModule, NbActionsModule } from '@nebular/theme';

import { CalendarPerMonthComponent } from './components/calendar-per-month/calendar-per-month.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditionComponent } from './components/event-edition-form/event-edition.component';
import { EventEditionWindowComponent } from './components/event-edition-window/event-edition-window.component';
import { EventService } from './services/event.service';
import { EventBadgesComponent } from './components/event-badges/event-badges.component';
import { BranchNameGenerationFormComponent } from './components/branch-name-generation-form/branch-name-generation-form.component';
import { BranchNameGenerationFormWindowComponent } from './components/branch-name-generation-form-window/branch-name-generation-form-window.component';
import { BranchNameListComponent } from './components/branch-name-list/branch-name-list.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BranchService } from './services/branch.service';
import { DatabaseService } from './services/database.service';
import { BranchNameGenerationDetailWindowComponent } from './components/branch-name-generation-detail-window/branch-name-generation-detail-window.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { ApertiumTranslateService } from './services/apertium-translate.service';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    WebviewDirective, 
    CalendarPerMonthComponent, 
    EventListComponent, 
    EventEditionComponent, 
    EventEditionWindowComponent, 
    EventBadgesComponent, 
    BranchNameGenerationFormComponent, 
    BranchNameGenerationFormWindowComponent, 
    BranchNameListComponent, BranchNameGenerationDetailWindowComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    TranslateModule, 
    FormsModule, 
    ReactiveFormsModule,
    NbTreeGridModule,
    NbTableModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
    NbInputModule,
    NbTimepickerModule,
    NbDatepickerModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbTooltipModule,
    NbLayoutModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbAccordionModule,
    NbTabsetModule,
    NbAutocompleteModule,
    EditorModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule, 
    NbTreeGridModule,
    NbTableModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
    NbInputModule,
    NbTimepickerModule,
    NbDatepickerModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbTooltipModule,
    NbLayoutModule,
    NbActionsModule,
    NbEvaIconsModule,
    CalendarPerMonthComponent,
    EventListComponent, 
    EventEditionComponent, 
    EventEditionWindowComponent,
    BranchNameGenerationFormComponent, 
    BranchNameGenerationFormWindowComponent, 
    BranchNameListComponent
  ],
  providers: [
    DatabaseService,
    EventService,
    BranchService,
    ApertiumTranslateService
  ]
})
export class SharedModule {}
