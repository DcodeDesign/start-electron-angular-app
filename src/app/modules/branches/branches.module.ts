import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches/branches.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BranchesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BranchesRoutingModule
  ]
})
export class BranchesModule { }
