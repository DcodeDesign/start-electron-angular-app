import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, map, Observable } from 'rxjs';
import { IBranch } from '../components/branch-name-generation-form/interfaces/branch.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  
  private db: Dexie;
  private dbInitialized = false;

  private branchesTable: Dexie.Table<IBranch, string>;

  constructor(private databaseService: DatabaseService) {
    this.branchesTable = this.databaseService.db.table('branches');
  }
  
  createBranch(branch: IBranch): Observable<string> {
    return from(this.branchesTable.add(branch));
  }

  getBranches(): Observable<IBranch[]> {
    let branch$: Observable<IBranch[]>;
  
    branch$ = from(this.branchesTable.toArray());
  
    return branch$;
  }

  updateBranch(updatedBranch: IBranch): Observable<number> {
    return from(this.branchesTable.update(updatedBranch.uuid, updatedBranch));
  }

  deleteBranch(uuid: string): Observable<void> {
    return from(this.branchesTable.delete(uuid));
  }
}
