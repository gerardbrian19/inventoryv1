import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
  @Input() isOpen = false;
  @Output() closeCart = new EventEmitter<void>();

  private cartService = inject(CartService);
  private dialog = inject(MatDialog);

  readonly cartItems = this.cartService.cartItems;
  readonly cartTotal = this.cartService.cartTotal;

  increase(productId: number): void {
    const item = this.cartItems().find(i => i.product.id === productId);
    if (item) this.cartService.addToCart(item.product);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearAll(): void {
    this.cartService.clearCart();
  }

  openPayment(): void {
    this.close();
    this.dialog.open(PaymentDialogComponent, {
      data: { total: this.cartTotal() },
      width: '460px',
      maxWidth: '96vw',
      panelClass: 'payment-dialog-panel'
    });
  }

  close(): void {
    this.closeCart.emit();
  }
}
