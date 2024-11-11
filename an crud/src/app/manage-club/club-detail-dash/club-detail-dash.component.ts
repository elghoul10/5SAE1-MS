import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Club } from '../models/course';
import { Event } from '../models/event';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../services/club.service';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-club-detail-dash',
  templateUrl: './club-detail-dash.component.html',
  styleUrls: ['./club-detail-dash.component.scss'],
})
export class ClubDetailDashComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'nomLesson',
    'dateDebLesson',
    'dateFinLesson',
    'descriptionLesson',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  brandNewSpecialite: any;
  uploadUrl = 'http://localhost:8081/upload-directory/';
  currentClub: Club | null;
  eventsList: Event[];
  filtredEventsList: Event[];
  searchInput: string = '';

  constructor(
    private addEventDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private clubService: ClubService,
    private eventService: EventService,
    private updateEventDialog: MatDialog
  ) {
    this.eventsList = [];
  }

  ngOnInit(): void {
    this.refreshEventList();
  }

  refreshEventList(): void {
    this.clubService
      .getClub(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (res) => {
          console.log('API Response:', res);

          this.currentClub = res;

          this.dataSource = new MatTableDataSource(this.eventsList);
          this.dataSource.paginator = this.paginator;

          this.getEvents();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.eventsList = events;
        this.dataSource = new MatTableDataSource(this.eventsList);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onDeleteEvent(id: any): void {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.refreshEventList();
      }
      // handle errors...
    );
  }
}
