import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../../services/event.service';
import { Club } from '../models/course';
import { EventModel, Ordre, Page } from 'app/models/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  filtredClubsList: Club[];
  searchInput: string = '';

  user: any = {};
  isEditMode: boolean = false;



  events: EventModel[] = [];

  showEventModal: boolean=false;
  newEvent: EventModel = {
    eventCode: '',
    type: '',
    description: '',
    timestamp: '',
    status: 'En Cours',
    location: '',
    impactLevel: '',
    orderTransportId: 0
  };
submit:boolean=false;
showdeleteEventModal:boolean=false;
searchQuery: string = '';
selectedStatus:string = '';
eventToDelete:EventModel
page: Page<EventModel>;
totalPages: number = 0;
currentPage: number = 0;
pageSize: number = 5;
orders:Ordre[]

  constructor(
    private eventService: EventService,private datePipe: DatePipe
  ) {}

  dataSource = new MatTableDataSource<Club>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadEvents()
    this.LoadOrders()
  }




  loadEvents(code?: string, chauffeurId?: number, orderTransportId?: number,status?:string, page: number = 0, size: number = 5): void {
    console.log('yes it work',code)
    this.eventService.getEventsByFilter(code, chauffeurId, orderTransportId,status, page, size)
      .subscribe({
        next: (data: Page<EventModel>) => {
          this.events = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
          this.pageSize = data.size;
        },
        error: (error) => {
          console.error('Error loading events:', error);
        }
      });
  }

  LoadOrders(){
    this.eventService.getAllOrdres().subscribe({
      next:(data:Ordre[])=>{
        this.orders=data
        console.log(data)
      }
    })
  }

  onPageChange(newPage: number): void {
    this.loadEvents(this.searchQuery, undefined, undefined,this.selectedStatus, newPage, this.pageSize);
  }

  openAddEventModal() {
    this.showEventModal = true;
  }

  closeAddEventModal() {
    this.showEventModal = false;

  }

  opendeleteEventModal(event:EventModel) {
    this.eventToDelete=event
    this.showdeleteEventModal = true;
  }

  closedeleteEventModal() {
    this.showdeleteEventModal = false;

  }

  addEvent(): void {
    this.submit=true
    if (this.validateEvent(this.newEvent)) {
      this.newEvent.chauffeurId = 1;
      console.log('Event data before sending to service:', this.newEvent);
      
      this.eventService.createEvent(this.newEvent,this.newEvent.orderTransportId).subscribe({
        next: (response) => {
          console.log('Event added successfully:', response);
          this.closeAddEventModal();
          this.loadEvents(this.searchQuery,undefined,undefined,this.selectedStatus);
        },
        error: (error) => {
          console.error('Error adding event:', error);
        }
      });
    } else {
      console.error('Please fill in all required fields.');
    }
  }

  private validateEvent(event: EventModel): boolean {
    return !!event.type && !!event.timestamp && !!event.status && !!event.location && !!event.impactLevel;
  }

  onSearchChange(value: string): void {
   this.loadEvents(value)
  }

  getByStatus(): void {
    console.log('yes')
    this.loadEvents(this.searchQuery,undefined,undefined,this.selectedStatus)
}

deleteEvent(): void {
  this.eventService.deleteEvent(this.eventToDelete.id!).subscribe({
    next: (response) => {
      console.log('Event deleted successfully:', response);
      
    },
    error: (error) => {
      console.error('Error deleting event:', error);
    }
  });
  this.events = this.events.filter(event => event.id !== this.eventToDelete.id);
  this.closedeleteEventModal()
}

goToPage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.loadEvents(this.searchQuery,undefined,undefined,this.selectedStatus,page);
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
    this.loadEvents(this.searchQuery,undefined,undefined,this.selectedStatus,this.currentPage - 1);
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.loadEvents(this.searchQuery,undefined,undefined,this.selectedStatus,this.currentPage + 1);
  }
}

formatDate(date: string): string {
  return this.datePipe.transform(date, 'd MMMM yyyy HH:mm') || '';
}
}
