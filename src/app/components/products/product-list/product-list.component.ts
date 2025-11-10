import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ProductResponseDto } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductResponseDto[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Products loaded:', products);
        this.products = products.filter(product => product != null);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  trackByProductId(index: number, product: ProductResponseDto): string {
    return product?.id ?? index.toString();
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) {
      return '';
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${environment.apiUrl}/${imagePath}`;
  }

  getFirstImage(product: ProductResponseDto): string | null {
    if (product.imagePaths && product.imagePaths.length > 0) {
      return this.getImageUrl(product.imagePaths[0]);
    }
    return null;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(price);
  }

  // Display sizes as comma-separated string
  getSelectedSizes(product: ProductResponseDto): string {
    if (!product.sizes || product.sizes.length === 0) {
      return 'No sizes available';
    }
    return product.sizes.join(', ');
  }

  // Create array of size chips for display
  getSizeChips(product: ProductResponseDto): string[] {
    return product.sizes || [];
  }

  getTruncatedDescription(description: string | null | undefined): string {
    if (!description) {
      return 'No description available';
    }
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  onImageError(event: any): void {
    console.warn('Image failed to load:', event);
  }
}