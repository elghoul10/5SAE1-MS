import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListDashComponent } from './club-list-dash/club-list-dash.component';
import { DeleteClubComponent } from './delete-club/delete-club.component';
import { ClubDetailDashComponent } from './club-detail-dash/club-detail-dash.component';

const routes: Routes = [
  {
    path: '',
    component: ClubListDashComponent,
  },
  {
    path: 'detail/:id',
    component: ClubDetailDashComponent,
  },
  {
    path: 'front',
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
