import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../enums/language.enum';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent {
  languageEnum = LanguageEnum
  currentLang: LanguageEnum | string = LanguageEnum.EN;
  
  constructor(private translate: TranslateService,) {
    translate.addLangs([LanguageEnum.EN, LanguageEnum.FR]);
    translate.setDefaultLang(LanguageEnum.EN);
    const browserLang = translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr/) ? browserLang : 'en'

    translate.use(this.currentLang); 
  }

  useLanguage(language: LanguageEnum): void {
    this.currentLang = language;
    this.translate.use(language);
  }
}
