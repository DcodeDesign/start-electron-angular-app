import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ChangeLanguageComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    TranslateModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ChangeLanguageComponent
  ],
  providers: []
})
export class SharedModule {}
