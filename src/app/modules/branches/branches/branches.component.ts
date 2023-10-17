import { Component } from '@angular/core';
import { BranchService } from '../../../shared/services/branch.service';
import { IBranch } from '../../../shared/components/branch-name-generation-form/interfaces/branch.interface';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent {
  branches: IBranch[];

  constructor(private branchService: BranchService) { }
  
  ngOnInit(): void {
    this.branchService.getBranches().subscribe(branches => this.branches = branches);
  }

  onCreatedBranch(branch: IBranch) {
    this.branchService.createBranch(branch).subscribe();
    this.branchService.getBranches().subscribe(branches => this.branches = branches);
  }

  onDeletedBranch(branchUuid: string) {
    this.branchService.deleteBranch(branchUuid).subscribe();
    this.branchService.getBranches().subscribe(branches => this.branches = branches);
  }

  onEditedBranch(branch: IBranch) {
    console.log(branch);
    this.branchService.updateBranch(branch).subscribe();
    this.branchService.getBranches().subscribe(branches => this.branches = branches);
  }
}
