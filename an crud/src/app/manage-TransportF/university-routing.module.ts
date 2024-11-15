import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityListDashComponent } from './university-list-dash/university-list-dash.component';
import { UniversityDetailDashComponent } from './university-detail-dash/university-detail-dash.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityDetailComponent } from './university-detail/university-detail.component';
import { ZoomComponentViewComponent } from './zoom-component-view/zoom-component-view.component';

const routes: Routes = [
  {
    path: 'lesson',
    children: [
      {
        path: '',
        component: UniversityListDashComponent,
      },
      {
        path: ':id',
        component: UniversityListDashComponent,
      },
    ],
  },
  {
    path: '',
    component: UniversityListComponent,
  },
  {
    path: 'zoom/:var',
    component: ZoomComponentViewComponent,
  },
  {
    path: 'Detail/:id',
    component: UniversityDetailComponent,
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        component: NewsDetailsComponent,
      },
      {
        path: ':id',
        component: NewsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUniversityRoutingModule {}
