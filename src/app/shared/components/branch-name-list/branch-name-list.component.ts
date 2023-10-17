import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBranch } from '../branch-name-generation-form/interfaces/branch.interface';
import { NbWindowService } from '@nebular/theme';
import { BranchStatusEnum } from '../branch-name-generation-form/enums/branch-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { BranchNameGenerationFormWindowComponent } from '../branch-name-generation-form-window/branch-name-generation-form-window.component';
import { BranchNameGenerationDetailWindowComponent } from '../branch-name-generation-detail-window/branch-name-generation-detail-window.component';

@Component({
  selector: 'app-branch-name-list',
  templateUrl: './branch-name-list.component.html',
  styleUrls: ['./branch-name-list.component.scss']
})
export class BranchNameListComponent {
  @Input() branches: IBranch[] = [];
  @Output() createdBranch = new EventEmitter<IBranch>();
  @Output() editedBranch = new EventEmitter<IBranch>();
  @Output() deletedBranch = new EventEmitter<string>();

  constructor(private windowService: NbWindowService) { }

  editedBranchWindow(branch: IBranch = null) {
    const windowRef = this.windowService.open(BranchNameGenerationFormWindowComponent, {
      title: 'Edit branch',
      windowClass: "branch-edition-window",
      context: {
        isNew: branch?.uuid ? false : true,
        uuid: branch?.uuid ? branch.uuid : uuidv4(),
        id: branch?.id ? branch.id : null,
        text: branch?.text ? branch.text : null,
        link: branch?.link ? branch.link : null,
        description: branch?.description ? branch.description : null,
        status: branch?.status ? branch.status : BranchStatusEnum.TASK
      },
    });

    windowRef.onClose.subscribe(branch => {
      if (branch) {
        if (branch.isNew) {
          branch.isNew = false;
          this.createdBranch.emit(branch)
        } else {
          this.editedBranch.emit(branch)
        }
      }
    });
  }

  detailBranch(branch: IBranch) {
    const windowRef = this.windowService.open(BranchNameGenerationDetailWindowComponent, {
      windowClass: "branch-detail-window",
      title: 'Detail branch',
      context: {
        ...branch
      },
    });

  }

  deleteBranch(branchUuid: string) {
    this.deletedBranch.emit(branchUuid)
  }
}
