import { Injectable } from '@angular/core';
import { Club } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private apiUrl = 'http://localhost:8082/ordre';

  constructor(private http: HttpClient) {}

  addClub(ordre: Club): Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/addActualite`, ordre);
  }

  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/getOneActualite/${id}`);
  }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.apiUrl);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteActualite/${id}`);
  }

  updateClub(ordre: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/updateActualite`, ordre);
  }
}
