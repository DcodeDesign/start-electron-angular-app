import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { GlobalResolver } from '../../shared/resolvers/global.resolver';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    resolve: { global: GlobalResolver },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '', // Utilisez un chemin spécifique si vous en avez un en tête
        component: BranchesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
