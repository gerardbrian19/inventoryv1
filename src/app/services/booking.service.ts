import { Injectable } from '@angular/core';

export interface ServiceType {
  id: number;
  name: string;
  duration: string;
  price: number;
}

export interface TimeSlot {
  value: string;
  label: string;
}

export interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  customer: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  getServiceTypes(): ServiceType[] {
    return [
      { id: 1, name: 'Equipment Consultation', duration: '1 hour', price: 75 },
      { id: 2, name: 'Installation & Setup', duration: '2 hours', price: 150 },
      { id: 3, name: 'Product Demo', duration: '30 min', price: 0 },
      { id: 4, name: 'Technical Support', duration: '1 hour', price: 60 },
      { id: 5, name: 'Custom Configuration', duration: '3 hours', price: 200 }
    ];
  }

  getTimeSlots(): TimeSlot[] {
    return [
      { value: '09:00', label: '9:00 AM' },
      { value: '10:00', label: '10:00 AM' },
      { value: '11:00', label: '11:00 AM' },
      { value: '13:00', label: '1:00 PM' },
      { value: '14:00', label: '2:00 PM' },
      { value: '15:00', label: '3:00 PM' },
      { value: '16:00', label: '4:00 PM' }
    ];
  }

  getUpcomingBookings(): Booking[] {
    return [
      { id: 1, service: 'Equipment Consultation', date: 'May 6, 2026', time: '10:00 AM', customer: 'Alice Johnson', status: 'Confirmed' },
      { id: 2, service: 'Installation & Setup', date: 'May 8, 2026', time: '2:00 PM', customer: 'Bob Martinez', status: 'Confirmed' },
      { id: 3, service: 'Technical Support', date: 'May 10, 2026', time: '11:00 AM', customer: 'Carol White', status: 'Pending' },
      { id: 4, service: 'Product Demo', date: 'May 12, 2026', time: '3:00 PM', customer: 'David Lee', status: 'Confirmed' },
      { id: 5, service: 'Custom Configuration', date: 'May 15, 2026', time: '9:00 AM', customer: 'Eve Turner', status: 'Pending' }
    ];
  }
}
