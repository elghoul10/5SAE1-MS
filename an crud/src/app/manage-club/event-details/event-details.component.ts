import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventModel, Page } from 'app/models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: EventModel | undefined;
  showEventModal: boolean=false;
  submit:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data; 
      },
      error: (error) => {
        console.error('Error fetching event details', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/events/event-list']);
  }

  openAddEventModal() {
    this.showEventModal = true;
  }

  closeAddEventModal() {
    this.showEventModal = false;

  }

  private validateEvent(event: EventModel): boolean {
    return !!event.type && !!event.timestamp && !!event.status && !!event.location && !!event.impactLevel;
  }

  modifierEvent(): void {
    this.submit=true
    if (this.validateEvent(this.event!) && this.event) {
      this.event.chauffeurId = 1;
      this.event.orderTransportId = 1;
      this.eventService.updateEvent(this.event.id!,this.event).subscribe({
        next: (response) => {
          this.closeAddEventModal();
        },
        error: (error) => {
          console.error('Error adding event:', error);
        }
      });
    } else {
      console.error('Please fill in all required fields.');
    }
  }
}