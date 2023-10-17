import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { GlobalResolver } from '../../shared/resolvers/global.resolver';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    resolve: { global: GlobalResolver },
    children: [
      {
        path: '', // Utilisez un chemin spécifique si vous en avez un en tête
        component: EventsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
