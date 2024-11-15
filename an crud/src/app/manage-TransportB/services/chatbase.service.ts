// chatbase.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbaseService {
  private apiUrl = 'https://www.chatbase.co/api/v1/chat';

  private chatId = 'Cc_MG3dQedN2zrgpkh9kL';

  constructor(private http: HttpClient) {}

  streamChat(messages: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(
      this.apiUrl,
      {
        messages,
        chatId: this.chatId,
        stream: true,
        temperature: 0,
      },
      { headers, responseType: 'text' }
    );
  }
}
