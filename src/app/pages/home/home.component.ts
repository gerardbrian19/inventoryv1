import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  searchQuery = signal('');
  selectedCategory = signal('All');

  allProducts = this.productService.getProducts();

  categories = ['All', ...new Set(this.allProducts.map(p => p.category))];

  filteredProducts = computed(() => {
    return this.allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesCat = this.selectedCategory() === 'All' || p.category === this.selectedCategory();
      return matchesSearch && matchesCat;
    });
  });

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.name} added to cart`, 'View Cart', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }
}
