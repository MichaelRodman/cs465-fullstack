import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tripDataService: TripDataService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      this.router.navigate(['/']);
      return;
    }

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip[]) => {
        if (value.length > 0) {
          const trip = value[0];

          this.editForm.patchValue({
            ...trip,
            start: trip.start
              ? String(trip.start).substring(0, 10)
              : ''
          });
        }
      },
      error: (error: any) => {
        console.log('Error retrieving trip:', error);
      }
    });
  }

  public onSubmit(): void {
    this.tripDataService
      .updateTrip(this.editForm.value as Trip)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Error updating trip:', error);
        }
      });
  }
}