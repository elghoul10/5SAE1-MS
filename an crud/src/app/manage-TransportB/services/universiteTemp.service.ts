import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniversiteTempService {
  constructor(private http: HttpClient) {}

  private _baseLocalUrl = 'http://localhost:8081/api/api/auth';

  getAllUniversites() {
    return this.http.get(`${this._baseLocalUrl}/dashboard/universite`);
  }
}
