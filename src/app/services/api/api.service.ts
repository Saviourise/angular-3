import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = `https://flagcdn.com/en/codes.json`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}