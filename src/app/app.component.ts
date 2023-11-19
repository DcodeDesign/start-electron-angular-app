import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { LanguageEnum } from './shared/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languageEnum = LanguageEnum
  currentLang: LanguageEnum | string = LanguageEnum.EN;
  
  constructor(private electronService: ElectronService) {
    if (electronService.isElectron) {
      console.log('is electron app');
      console.log('env', process.env);
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
