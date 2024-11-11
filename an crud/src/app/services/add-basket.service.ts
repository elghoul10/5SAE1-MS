import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddBasketService {
  constructor(private httpClient: HttpClient) {}
  addItemToBasket(idc: any, idu: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:8081/pi/basket/addToBasket?idc=${idc}&idu=${idu}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
