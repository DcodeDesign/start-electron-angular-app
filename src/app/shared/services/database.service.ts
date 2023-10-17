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

  private initDatabase(): void {
    this.db = new Dexie('WorkToolsDatabase');
    
    // Ici, définissez toutes les tables que vous voulez
    this.db.version(1).stores({
      branches: 'uuid, id, text, name, link, description',
      events: 'uuid, date, text, hour'
    });
  }

  exportDatabase(): Observable<Blob> {
    return from(this.db.export());
  }

  importDatabase(blob: Blob): Observable<void> {
    return from(this.db.import(blob));
  }
}