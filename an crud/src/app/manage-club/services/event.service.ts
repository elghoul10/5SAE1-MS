import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../models/event';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8081/api/api/auth';

  constructor(private http: HttpClient) {}

  addEvent(data: any, id: any): Observable<Event> {
    console.log('data');
    console.log(data);
    return this.http.post<Event>(
      `${this.baseUrl}/dashboard/clubs/addEvent/${id}`,
      data
    );
  }

  uploadImage(id: any, file: File): Observable<Event> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);

    return this.http.post<Event>(
      `${this.baseUrl}/dashboard/clubs/events/uploadImage/${id}`,
      formData
    );
  }

  deleteEvent(id: any) {
    return this.http.delete(
      `${this.baseUrl}/dashboard/clubs/deleteEvent/${id}`
    );
  }

  getEvent(id: any): Observable<Event> {
    return this.http.get<Event>(
      `${this.baseUrl}/dashboard/clubs/getOneEvent/${id}`
    );
  }

  updateEvent(data: any, id: any): Observable<Event> {
    console.log('data');
    console.log(data);
    return this.http.put<Event>(
      `${this.baseUrl}/dashboard/clubs/updateEvent/${id}`,
      data
    );
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/events/front`);
  }

  getLessonsByCourseId(idCourse: number): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.baseUrl}/dashboard/clubs/getLessonsByCourseId/${idCourse}`
    );
  }

  saveRating(
    userId: number,
    idEvent: number,
    ratingValue: string
  ): Observable<any> {
    const payload = {
      idUser: userId,
      ratingValue: ratingValue,
      lesson: {
        idEvent: idEvent,
      },
    };

    return this.http.post<any>(
      `${this.baseUrl}/saveReview/${idEvent}`,
      payload
    );
  }

  getReviewsForLesson(lessonId: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${this.baseUrl}/getReviewsForLesson/${lessonId}`
    );
  }

  analyzeSentiment(sentence: string): Observable<any> {
    const request = { sentence: sentence };
    return this.http
      .post<any>(`${this.baseUrl}/analyze-sentiment`, request)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }

  getPrice(
    courseName: string,
    subject: string,
    duration: number
  ): Observable<any> {
    const request = {
      course_name: courseName,
      subject: subject,
      duration: duration,
    };

    return this.http.post<any>(`${this.baseUrl}/price`, request);
  }
}
