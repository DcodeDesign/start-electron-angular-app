import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApertiumTranslateService {

  private baseUrl = 'https://www.apertium.org/apy/translate?q=';

  constructor(private http: HttpClient) { }

  translate(text: string, sourceLang: string, targetLang: string): Observable<any> {
    const langPair = `${sourceLang}|${targetLang}`;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `${this.baseUrl}${encodeURIComponent(text)}&langpair=${langPair}&format=json`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.http.get(url);
  }
}
