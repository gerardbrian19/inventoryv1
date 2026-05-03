import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

export interface Order {
  id: string;
  product: string;
  category: string;
  date: string;
  amount: number;
  quantity: number;
  status: 'Delivered' | 'Pending' | 'Cancelled' | 'Processing';
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  displayedColumns = ['id', 'product', 'date', 'quantity', 'amount', 'status', 'actions'];
  statusFilter = 'All';
  searchQuery = '';

  orders: Order[] = [
    { id: 'ORD-1001', product: 'Wireless Headphones', category: 'Electronics', date: 'Apr 28, 2026', amount: 89.99, quantity: 1, status: 'Delivered' },
    { id: 'ORD-1002', product: 'Ergonomic Office Chair', category: 'Furniture', date: 'Apr 30, 2026', amount: 299.00, quantity: 1, status: 'Delivered' },
    { id: 'ORD-1003', product: 'Mechanical Keyboard', category: 'Electronics', date: 'May 1, 2026', amount: 259.90, quantity: 2, status: 'Processing' },
    { id: 'ORD-1004', product: 'Standing Desk', category: 'Furniture', date: 'May 1, 2026', amount: 499.00, quantity: 1, status: 'Pending' },
    { id: 'ORD-1005', product: 'Webcam 4K Pro', category: 'Electronics', date: 'May 2, 2026', amount: 149.99, quantity: 1, status: 'Pending' },
    { id: 'ORD-1006', product: 'Desk Lamp LED', category: 'Accessories', date: 'May 2, 2026', amount: 90.00, quantity: 2, status: 'Cancelled' },
    { id: 'ORD-1007', product: 'Monitor Arm Mount', category: 'Accessories', date: 'May 3, 2026', amount: 79.00, quantity: 1, status: 'Processing' },
    { id: 'ORD-1008', product: 'USB-C Hub 10-in-1', category: 'Electronics', date: 'May 3, 2026', amount: 119.98, quantity: 2, status: 'Delivered' },
  ];

  get filteredOrders(): Order[] {
    return this.orders.filter(o => {
      const matchesStatus = this.statusFilter === 'All' || o.status === this.statusFilter;
      const matchesSearch = o.product.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        o.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  get totalRevenue(): number {
    return this.orders.reduce((sum, o) => sum + o.amount, 0);
  }

  get deliveredCount(): number {
    return this.orders.filter(o => o.status === 'Delivered').length;
  }

  get pendingCount(): number {
    return this.orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Delivered': 'status-delivered',
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Cancelled': 'status-cancelled'
    };
    return map[status] ?? '';
  }

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      'Delivered': 'check_circle',
      'Pending': 'hourglass_empty',
      'Processing': 'sync',
      'Cancelled': 'cancel'
    };
    return map[status] ?? 'help';
  }
}
