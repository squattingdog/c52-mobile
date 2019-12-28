import { ShiftComponent } from './../../components/shift/shift.component';
import { ShiftsComponent } from './../../components/shifts/shifts.component';
import { JobComponent } from './../../components/job/job.component';
import { JobsComponent } from './../../components/jobs/jobs.component';
import { EventComponent } from './../../components/event/event.component';
import { EventsComponent } from './../../components/events/events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './../../pages/events/events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule
  ],
  declarations: [EventsPage, EventsComponent, EventComponent, JobsComponent, JobComponent, ShiftsComponent, ShiftComponent]
})
export class EventsPageModule {}
