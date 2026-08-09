import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() tripDeleted = new EventEmitter<string>();

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  public editTrip(tripCode: string): void {
    localStorage.setItem('tripCode', tripCode);
    this.router.navigate(['/edit-trip']);
  }

  public deleteTrip(tripCode: string): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${this.trip.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(tripCode).subscribe({
      next: () => {
        this.tripDeleted.emit(tripCode);
      },
      error: (error: any) => {
        console.log('Error deleting trip:', error);
      }
    });
  }
}