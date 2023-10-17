import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { ElectronService } from '../../../core/services/electron/electron.service';

@Component({
  selector: 'app-branch-name-generation-detail-window',
  templateUrl: './branch-name-generation-detail-window.component.html',
  styleUrls: ['./branch-name-generation-detail-window.component.scss']
})
export class BranchNameGenerationDetailWindowComponent implements OnInit {
  branch: any;
  CommitText: string;
  
  constructor(
    protected windowRef: NbWindowRef,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.branch = this.windowRef.config.context

    const status = this.branch?.status;
    const id = this.branch?.id;
    const text = this.branch?.text;
    this.CommitText = `${status}: ${id} - ${text} `
  }

  copyText(copyValue: string): void {
    navigator.clipboard.writeText(copyValue).catch(() => {
      console.error("Unable to copy text");
    });
  }

  openLink(link: string) {
    console.log(this.electronService)
    if(this.electronService.isElectron) { 
      this.electronService.electron.shell.openExternal(link)
    } else {
      window.open(link, "_blank");
    }
  
  } 
}
