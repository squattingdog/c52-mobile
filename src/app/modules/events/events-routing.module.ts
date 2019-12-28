import { ShiftsComponent } from './../../components/shifts/shifts.component';
import { EventsPage } from './../../pages/events/events.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from 'src/app/components/events/events.component';
import { JobsComponent } from 'src/app/components/jobs/jobs.component';

const routes: Routes = [
  { path: 'events', component: EventsPage, children: [
      { path: '', component: EventsComponent },
      { path: ':event-id/jobs', component: JobsComponent },
      { path: ':event-id/jobs/:job-id/shifts', component: ShiftsComponent }
  ]},
  { path: '', redirectTo: 'events' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
