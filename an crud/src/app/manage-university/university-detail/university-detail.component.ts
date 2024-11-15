import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClubService } from '../../manage-club/services/club.service';
import { Club } from '../../manage-club/models/course';

import { Event } from '../../manage-club/models/event';

import { EventService } from '../../manage-club/services/event.service';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: ['./university-detail.component.scss'],
})
export class UniversityDetailComponent {
  searchQuery: string = '';
  videoId: string;
  videoDetails: any;
  videoUrl: SafeResourceUrl;
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
  uploadUrl = 'http://localhost:8081/api/upload-directory/';
  currentClub: Club;
  eventsList: Event[];
  filtredEventsList: Event[];
  searchInput: string = '';
  searchTerm: string = '';
  definition: string = '';

  user: any = {};
  isEditMode: boolean = false;

  query: string;

  constructor(
    private addEventDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private clubService: ClubService,
    private eventService: EventService,
    private updateEventDialog: MatDialog,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
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
          this.searchQuery = res.nom.toString();

          console.log('courseDescription:', res.description);
          this.searchVideo(this.searchQuery);

          this.dataSource = new MatTableDataSource<any>(this.eventsList);
          this.dataSource.paginator = this.paginator;

          // Make a separate call to get events if available at a different endpoint
          this.getLessonsByCourseId();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateCourseTitle(newValue: string): void {
    if (this.currentClub) {
    }
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

  getLessonsByCourseId(): void {}

  onDeleteEvent(id: any): void {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.refreshEventList();
      }
      // handle errors...
    );
  }

  searchVideo(searchQuery: string): void {
    const apiKey = 'AIzaSyBg6KqOnNETpyStbVy31Cer3Xt38rXWnoM'; // Remplacez par votre clé d'API YouTube
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchQuery}&maxResults=1`;

    this.http.get<any>(apiUrl).subscribe((data) => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        this.fetchVideoDetails(videoId);
      } else {
        console.log('Aucune vidéo trouvée pour la recherche : ', searchQuery);
      }
    });
  }

  fetchVideoDetails(videoId: string): void {
    const apiKey = 'AIzaSyBg6KqOnNETpyStbVy31Cer3Xt38rXWnoM'; // Remplacez par votre clé d'API YouTube AIzaSyBg6KqOnNETpyStbVy31Cer3Xt38rXWnoM
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`;

    this.http.get<any>(url).subscribe((data) => {
      if (data.items && data.items.length > 0) {
        this.videoDetails = data.items[0];
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      } else {
        console.log(
          "Détails de la vidéo non disponibles pour l'ID : ",
          videoId
        );
      }
    });
  }

  getPriceDetails(
    courseName: string,
    subject: string,
    duration: number
  ): void {}
}
