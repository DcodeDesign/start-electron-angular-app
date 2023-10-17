import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { GlobalResolver } from '../../shared/resolvers/global.resolver';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    resolve: { global: GlobalResolver },
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
