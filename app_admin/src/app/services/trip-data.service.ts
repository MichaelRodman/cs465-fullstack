import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBaseUrl);
  }

  public getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/${tripCode}`);
  }

  public addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBaseUrl, formData);
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/${formData.code}`,
      formData
    );
  }

  public deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/${tripCode}`
    );
  }
}