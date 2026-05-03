import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageColor: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 89.99,
        category: 'Electronics',
        description: 'Premium over-ear wireless headphones with 30-hour battery life and active noise cancellation.',
        imageColor: '#4f46e5',
        stock: 42
      },
      {
        id: 2,
        name: 'Ergonomic Office Chair',
        price: 299.00,
        category: 'Furniture',
        description: 'Fully adjustable ergonomic chair with lumbar support, designed for long work sessions.',
        imageColor: '#0891b2',
        stock: 15
      },
      {
        id: 3,
        name: 'Mechanical Keyboard',
        price: 129.95,
        category: 'Electronics',
        description: 'Compact TKL mechanical keyboard with Cherry MX switches and RGB backlighting.',
        imageColor: '#7c3aed',
        stock: 28
      },
      {
        id: 4,
        name: 'Standing Desk',
        price: 499.00,
        category: 'Furniture',
        description: 'Electric height-adjustable standing desk with memory settings and cable management.',
        imageColor: '#059669',
        stock: 8
      },
      {
        id: 5,
        name: 'Webcam 4K Pro',
        price: 149.99,
        category: 'Electronics',
        description: 'Ultra HD 4K webcam with auto-focus, built-in microphone, and wide-angle lens.',
        imageColor: '#dc2626',
        stock: 33
      },
      {
        id: 6,
        name: 'Desk Lamp LED',
        price: 45.00,
        category: 'Accessories',
        description: 'Smart LED desk lamp with adjustable color temperature, brightness control, and USB-C charging port.',
        imageColor: '#d97706',
        stock: 60
      },
      {
        id: 7,
        name: 'Monitor Arm Mount',
        price: 79.00,
        category: 'Accessories',
        description: 'Dual-arm VESA-compatible monitor mount, supports screens up to 32 inches.',
        imageColor: '#be185d',
        stock: 20
      },
      {
        id: 8,
        name: 'USB-C Hub 10-in-1',
        price: 59.99,
        category: 'Electronics',
        description: '10-port USB-C hub with HDMI 4K, 100W PD charging, SD card reader and Ethernet.',
        imageColor: '#0f766e',
        stock: 55
      }
    ];
  }
}
