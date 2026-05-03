import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BookingService, ServiceType, TimeSlot, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  private bookingService = inject(BookingService);
  private snackBar = inject(MatSnackBar);

  serviceTypes: ServiceType[] = this.bookingService.getServiceTypes();
  timeSlots: TimeSlot[] = this.bookingService.getTimeSlots();
  upcomingBookings: Booking[] = this.bookingService.getUpcomingBookings();

  form = {
    service: '',
    date: null as Date | null,
    time: '',
    name: '',
    email: ''
  };

  minDate = new Date();
  submitting = signal(false);

  getServiceById(id: string): ServiceType | undefined {
    return this.serviceTypes.find(s => s.name === id);
  }

  submit(): void {
    const { service, date, time, name, email } = this.form;
    if (!service || !date || !time || !name.trim() || !email.trim()) {
      this.snackBar.open('Please fill in all fields.', 'OK', { duration: 3000 });
      return;
    }
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.snackBar.open(
        `✅ Booking confirmed for ${service} on ${date.toLocaleDateString()} at ${time}!`,
        'Close',
        { duration: 5000, panelClass: 'snack-success', horizontalPosition: 'end', verticalPosition: 'top' }
      );
      this.form = { service: '', date: null, time: '', name: '', email: '' };
    }, 800);
  }

  getStatusColor(status: string): string {
    return status === 'Confirmed' ? 'primary' : status === 'Pending' ? 'accent' : 'warn';
  }
}
