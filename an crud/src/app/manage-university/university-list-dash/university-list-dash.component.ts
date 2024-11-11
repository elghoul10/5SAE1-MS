import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClubService } from '../../manage-club/services/club.service';
import { Club } from '../../manage-club/models/course';

import { Event } from '../../manage-club/models/event';
import { Review } from '../../manage-club/models/Review';

import { EventService } from '../../manage-club/services/event.service';

@Component({
  selector: 'app-university-list-dash',
  templateUrl: './university-list-dash.component.html',
  styleUrls: ['./university-list-dash.component.scss'],
})
export class UniversityListDashComponent {
  dataSource: any;
  reviewsList: Review[] = [];

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
  currentLesson: any | null;
  eventsList: Event[];
  filtredEventsList: Event[];
  searchInput: string = '';

  userId: number = 1; // Vous devrez définir votre propre ID utilisateur
  idEvent: number = 9; // Vous devrez définir l'ID de l'événement approprié
  ratingValue: string = '';

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
    this.eventService
      .getEvent(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (res) => {
          console.log('API Response:', res);

          const eventData = res;

          this.currentLesson = eventData;
          this.getEvents();
          this.getReviewsForLesson(this.currentLesson.idEvent);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getVideoUrl(): string {
    if (this.currentLesson && this.currentLesson.imageLesson) {
      const videoFileName = this.currentLesson.imageLesson;
      const idEvent = this.currentLesson.idEvent;
      return `${this.uploadUrl}/${idEvent}/videos/${videoFileName}`;
    }
    return 'path/to/default/video.mp4';
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
    this.eventService.deleteEvent(id).subscribe(() => {
      this.refreshEventList();
    });
  }

  submitRating(): void {
    this.eventService
      .saveRating(this.userId, this.idEvent, this.ratingValue)
      .subscribe({
        next: (res) => {
          console.log('Rating saved successfully:', res);
          // Ajoutez ici tout code supplémentaire que vous souhaitez exécuter après avoir enregistré le rating
        },
        error: (err) => {
          console.error('Error saving rating:', err);
          // Ajoutez ici la gestion des erreurs, par exemple afficher un message à l'utilisateur
        },
      });
  }

  getReviewsForLesson(lessonId: number): void {
    this.eventService.getReviewsForLesson(lessonId).subscribe(
      (reviews) => {
        console.log('Reviews:', reviews);
        // Pour chaque commentaire, appelez analyzeSentiment pour obtenir la phrase associée
        reviews.forEach((review) => {
          this.eventService.analyzeSentiment(review.ratingValue).subscribe(
            (result) => {
              if (result && result.result) {
                review.sentence = result.result; // Ajoutez la phrase associée à l'objet Review
              }
            },
            (error) => {
              console.error('Error analyzing sentiment:', error);
            }
          );
        });
        this.reviewsList = reviews;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
