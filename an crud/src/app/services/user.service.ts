import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8081/api/api/auth';
  geminiUrl = 'https://exchange.gemini.com/locate'; // Définir l'URL Gemini ici
  constructor(private httpClient: HttpClient) {}

  verifyEmail(
    token: string
  ): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.baseUrl}/confirm-account/${token}`,
      null
    );
  }
  resetPassword(
    token: string,
    newPassword: string
  ): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.baseUrl}/reset-password/${token}`,
      { newPassword },
      { observe: 'response' } // Ajout de cette option pour obtenir la réponse complète (y compris le message)
    );
  }
  public getUserById(id: String) {
    return this.httpClient.get<User>(
      'http://localhost:8081/api/FindUserId/' + id
    );
  }
  getUserIdFromUsername(username: string): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8081/api/getuser/id', {
      params: { username },
    });
  }
  updateUser(user: User): Observable<User> {
    // Assuming your backend API endpoint for updating user is /api/EldSync/User/UpdateUser/:id
    return this.httpClient.put<User>(
      `http://localhost:8081/api/UpdateUser/${user.id}`,
      user
    );
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<string>(
      `http://localhost:8081/upload`,
      formData,
      { responseType: 'text' as 'json' } // Specify response type as text to receive the URL string
    );
  }

  locateResource(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer <your_access_token>',
    });

    return this.httpClient.get<any>(this.geminiUrl, { headers });
  }

  uploadImage(fileImage: File, id: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileImage', fileImage, fileImage.name);

    const headers = new HttpHeaders({
      'Requestor-Type': 'angular', // Exemple de header personnalisé
    });

    return this.httpClient.post(
      `http://localhost:8081/api/dashboard/clubs/uploadImage/${id}`,
      formData,
      { headers }
    );
  }
}
