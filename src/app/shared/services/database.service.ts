// database.service.ts
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import 'dexie-export-import';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: Dexie;

  constructor() {
    this.initDatabase();
  }

  initDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        // Ici, vous initialisez votre base de données.
        // Si tout se passe bien, résolvez la promesse.
        // Sinon, si une erreur se produit, rejetez la promesse.

        // Exemple :
        this.db = new Dexie('WorkToolsDatabase');
        this.db.version(1).stores({
          branches: 'uuid, id, text, name, link, description',
          events: 'uuid, date, text, hour'
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  
  exportDatabase(): Observable<Blob> {
    return from(this.db.export());
  }

  importDatabase(blob: Blob): Observable<void> {
    return from(this.db.import(blob));
  }
}