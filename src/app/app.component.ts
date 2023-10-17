import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from './shared/enums/language.enum';
import { DatabaseService } from './shared/services/database.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languageEnum = LanguageEnum
  currentLang: LanguageEnum | string = LanguageEnum.EN;
  
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private dbService: DatabaseService
  ) {
    translate.addLangs([LanguageEnum.EN, LanguageEnum.FR]);
    translate.setDefaultLang(LanguageEnum.EN);
    const browserLang = translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr/) ? browserLang : 'en'

    translate.use(this.currentLang); 


    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  useLanguage(language: LanguageEnum): void {
    this.currentLang = language;
    this.translate.use(language);
  }

  exportDb() {
    this.dbService.exportDatabase().pipe(take(1)).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exportedDb.json';
      a.click();
    });
  }

  importDb(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const blob = new Blob([reader.result as string], { type: 'application/octet-stream' });
      this.dbService.importDatabase(blob).pipe(take(1)).subscribe(() => {
        console.log('Import successful!');
      });
    };
    
    reader.readAsText(file);
  }
}
