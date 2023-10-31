import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// structure
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './modules/home/home.module';

// Nebular
import { NbThemeModule, NbTimepickerModule, NbDatepickerModule, NbWindowModule } from '@nebular/theme';
import { DatabaseService } from './shared/services/database.service';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export function initializeApp(databaseService: DatabaseService) {
  return (): Promise<any> => { 
    return databaseService.initDatabase();
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbTimepickerModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbWindowModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    DatabaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DatabaseService],
      multi: true
    }]
})
export class AppModule {}
