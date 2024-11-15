import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page,EventModel, Ordre } from 'app/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
 

  private baseUrl = 'http://localhost:8081/event';

  private orderUrl = 'http://localhost:8085/ordre';
  
  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  createEvent(event: EventModel,orderid:number): Observable<EventModel> {
    console.log(event)
    return this.http.post<EventModel>(`${this.baseUrl}/add/${orderid}`, event, { headers: this.headers });
  }

  getEventsByFilter(code?: string, chauffeurId?: number, orderTransportId?: number,status?:string, page: number = 0, size: number = 10): Observable<Page<EventModel>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (code) params = params.set('code', code);
    if (chauffeurId) params = params.set('chauffeurId', chauffeurId.toString());
    if (orderTransportId) params = params.set('orderTransportId', orderTransportId.toString());
    if (status) params = params.set('status', status);

    return this.http.get<Page<EventModel>>(`${this.baseUrl}/filter`, { params, headers: this.headers  });
  }

  updateEvent(id: number, event: EventModel): Observable<EventModel> {
    return this.http.put<EventModel>(`${this.baseUrl}/${id}`, event, { headers: this.headers });
  }

  deleteEvent(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, { headers: this.headers });
  }

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/events`, { headers: this.headers });
  }

  getEventById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.baseUrl}/event/${id}`, { headers: this.headers });
  }
  changeEventStatus(id: number, status: string, mail: string): Observable<Event> {
    const url = `${this.baseUrl}/${id}/status`;
    const params = new HttpParams()
      .set('status', status)
      .set('mail', mail);

    return this.http.put<Event>(url, {}, { params,headers: this.headers });
  }


  getAllOrdres(): Observable<Ordre[]> {
    return this.http.get<Ordre[]>(`${this.orderUrl}`,{ headers: this.headers })
  }
}
