import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css'
})
export class PaymentDialogComponent {
  private dialogRef = inject(MatDialogRef<PaymentDialogComponent>);
  private snackBar = inject(MatSnackBar);
  private cartService = inject(CartService);

  readonly data = inject(MAT_DIALOG_DATA) as { total: number };

  referenceNumber = '';
  confirming = signal(false);

  gcash = {
    number: '0917-456-7890',
    accountName: 'InvenTrack Inc.',
  };

  banks = [
    {
      name: 'BDO Unibank',
      accountNumber: '1234-5678-9012',
      accountName: 'InvenTrack Inc.',
      branch: 'Makati City Branch'
    },
    {
      name: 'BPI Family Savings Bank',
      accountNumber: '9876-5432-1098',
      accountName: 'InvenTrack Inc.',
      branch: 'BGC Taguig Branch'
    }
  ];

  confirm(): void {
    if (!this.referenceNumber.trim()) {
      this.snackBar.open('Please enter your reference / transaction number.', 'OK', { duration: 3000 });
      return;
    }
    this.confirming.set(true);
    setTimeout(() => {
      this.confirming.set(false);
      this.cartService.clearCart();
      this.dialogRef.close('confirmed');
      this.snackBar.open(
        `✅ Payment confirmed! Your order has been placed. Ref: ${this.referenceNumber}`,
        'Close',
        { duration: 6000, horizontalPosition: 'end', verticalPosition: 'top' }
      );
    }, 1000);
  }
}
