import { Component } from '@angular/core';
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
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tripDataService: TripDataService,
    private router: Router
  ) {
    this.addForm = this.formBuilder.group({
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

  public onSubmit(): void {
    this.tripDataService
      .addTrip(this.addForm.value as Trip)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Error adding trip:', error);
        }
      });
  }
}