import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { IBranch } from '../branch-name-generation-form/interfaces/branch.interface';

@Component({
  selector: 'app-branch-name-generation-form-window',
  templateUrl: './branch-name-generation-form-window.component.html',
  styleUrls: ['./branch-name-generation-form-window.component.scss']
})
export class BranchNameGenerationFormWindowComponent implements OnInit{
  branch: IBranch;

  constructor(
    protected windowRef: NbWindowRef,
  ) { }

  ngOnInit(): void {
    this.branch = (this.windowRef.config.context as IBranch)
  }

  onCreatedBranch($event: any) {
    this.windowRef.close($event)
  }
}
