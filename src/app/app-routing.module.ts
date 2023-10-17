import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { GlobalResolver } from './shared/resolvers/global.resolver';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'events',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'branches',
      loadChildren: () => import('./modules/branches/branches.module').then(m => m.BranchesModule)
    },
    {
      path: 'events',
      loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
