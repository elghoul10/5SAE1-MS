import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ManageUniversityRoutingModule } from './university-routing.module';
import { UniversityListDashComponent } from './university-list-dash/university-list-dash.component';
import { AddUniversityDialogDashComponent } from './add-university-dialog-dash/add-university-dialog-dash.component';
import { UniversityDetailDashComponent } from './university-detail-dash/university-detail-dash.component';
import { AddNewsDialogDashComponent } from './add-news-dialog-dash/add-news-dialog-dash.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityDetailComponent } from './university-detail/university-detail.component';
import { ChatbootComponent } from './chatboot/chatboot.component';
import { ZoomComponentViewComponent } from './zoom-component-view/zoom-component-view.component';
import { PubComponent } from './pub/pub.component';
import { YoutubeComponent } from './youtube/youtube.component';

@NgModule({
  declarations: [
    UniversityListDashComponent,
    AddUniversityDialogDashComponent,
    UniversityDetailDashComponent,
    AddNewsDialogDashComponent,
    NewsDetailsComponent,
    UniversityListComponent,
    UniversityDetailComponent,
    ChatbootComponent,
    ZoomComponentViewComponent,
    PubComponent,
    YoutubeComponent,
  ],
  imports: [
    CommonModule,
    ManageUniversityRoutingModule,
    MaterialModule,
    FormsModule,
    TablerIconsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [TablerIconsModule],
})
export class UniversityModule {}
