import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api/trips';
  private authBaseUrl = 'http://localhost:3000/api';

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

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authBaseUrl}/login`,
      {
        email: user.email,
        password: passwd
      }
    );
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.authBaseUrl}/register`,
      {
        name: user.name,
        email: user.email,
        password: passwd
      }
    );
  }
}