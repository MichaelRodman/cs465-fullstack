import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Retrieve the JWT from browser storage
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');

    if (!token) {
      return '';
    }

    return token;
  }

  // Save the JWT in browser storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Remove the JWT when the user logs out
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Determine whether a valid, unexpired JWT exists
  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }

  // Retrieve the user information stored in the JWT
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  // Log in and save the JWT returned by the API
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: unknown) => {
        console.error('Login error:', error);
      }
    });
  }

  // Register and save the JWT returned by the API
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        if (value) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: unknown) => {
        console.error('Registration error:', error);
      }
    });
  }
}