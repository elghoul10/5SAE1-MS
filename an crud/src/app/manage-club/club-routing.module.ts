import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListDashComponent } from './club-list-dash/club-list-dash.component';
import { DeleteClubComponent } from './delete-club/delete-club.component';
import { ClubDetailDashComponent } from './club-detail-dash/club-detail-dash.component';
import { EventListDashboardComponent } from './event-list-dashboard/event-list-dashboard.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClubListDashComponent,
  },
  {
    path: 'event-list-admin', component: EventListDashboardComponent
  },
  {
    path: 'detail/:id',
    component: ClubDetailDashComponent,
  },
  {
    path: 'front',
    children: [],
  },
  {
    path: 'event-list', component: EventListComponent
  },
  { path: 'event-details/:id', component: EventDetailsComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
