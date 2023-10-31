/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  electron: any;
  ipcRenderer: any;
  webFrame: any;
  fs: any;
  childProcess: any;


  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.electron = (window as any).require('electron');
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;

      this.fs = (window as any).require('fs');

      this.childProcess = (window as any).require('child_process');
      this.childProcess.exec('node -v', (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout:\n${stdout}`);
      });

      // Notes :
      // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
      // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
      // because it will loaded at runtime by Electron.
      // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
      // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
      // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

      // If you want to use a NodeJS 3rd party deps in Renderer process,
      // ipcRenderer.invoke can serve many common use cases.
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  get platform(): any {
    if(this.isElectron) {
      return window.process;
    }
    
    return 'Web';
  }

  translate(inputText: string, targetLanguage: string): Observable<string> {
    console.log(this.electron, this.ipcRenderer, this.childProcess )
    return new Observable<string>((observer) => {
        if (!this.isElectron || !this.ipcRenderer) {
            observer.error(new Error('This method is only available in Electron environment.'));
            return;
        }

        this.ipcRenderer.once('translation-response', (event: any, translatedText: string) => {
            observer.next(translatedText);
            observer.complete();
        });

        this.ipcRenderer.send('translate-text', inputText, targetLanguage);

        return () => {
            // Si nécessaire, ajoutez ici du code pour nettoyer les ressources ou annuler les opérations en cours
        };
    });
}

}