import { NgModule } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { TronsportRoutingModule } from './Transport-routing.module';

import { ClubListDashComponent } from './club-list-dash/club-list-dash.component';
import { DeleteClubComponent } from './delete-club/delete-club.component';
import { AddClubDialogDashComponent } from './add-club-dialog-dash/add-club-dialog-dash.component';
import { UpdateClubDialogDashComponent } from './update-club-dialog-dash/update-club-dialog-dash.component';
import { ErrorFormHandlerComponent } from './error-form-handler/error-form-handler.component';
import { ClubDetailDashComponent } from './club-detail-dash/club-detail-dash.component';

import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    ClubListDashComponent,
    DeleteClubComponent,
    AddClubDialogDashComponent,
    UpdateClubDialogDashComponent,
    ErrorFormHandlerComponent,
    ClubDetailDashComponent,
    ChatbotComponent,
  ],
  imports: [
    CommonModule,
    TronsportRoutingModule,
    MaterialModule,
    FormsModule,
    TablerIconsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [TablerIconsModule],
  providers: [
    DatePipe,
    // ...
  ],
})
export class TransportModule {}
