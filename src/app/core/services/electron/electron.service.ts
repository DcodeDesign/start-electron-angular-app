/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable } from '@angular/core';


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
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  get platform() {
    if(this.isElectron) {
      return window?.process;
    }
    
    return 'Web';
  }
}