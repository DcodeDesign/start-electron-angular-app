import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GoogleObj {
  q: string[];
  target: string;
  }

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {

url = 'https://translation.googleapis.com/language/translate/v2?key=';
key = 'AIzaSyCG0fP_14MDvspwXSvyBUbiThVRsjsSPew';

constructor(private http: HttpClient) { }

  translate(obj: GoogleObj): Observable<any> {
    return this.http.post(this.url + this.key, obj);
  }

  /* usage

    const googleObj: GoogleObj = {
      q: ['je suis un texte.'],
      target: 'en'
    };

    this.googletranslateService.translate(googleObj).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  */
}
