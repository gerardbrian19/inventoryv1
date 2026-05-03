import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../services/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    CartSidebarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  readonly themeService = inject(ThemeService);

  readonly itemCount = this.cartService.itemCount;
  cartOpen = false;

  navLinks = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'Services', path: '/services', icon: 'build' },
    { label: 'Orders', path: '/orders', icon: 'shopping_bag' },
    { label: 'Messages', path: '/messages', icon: 'mail' },
    { label: 'Settings', path: '/settings', icon: 'settings' }
  ];

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  closeCart(): void {
    this.cartOpen = false;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
