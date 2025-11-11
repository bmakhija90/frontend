import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateProductDto, ProductResponseDto } from '../models/product.model';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) { }

createProduct(product: CreateProductDto, images: File[]): Observable<ProductResponseDto> {
  const formData = new FormData();
  
  // Append images
  images.forEach((image, index) => {
    formData.append('images', image, image.name);
  });
  
  // Append product as JSON string
  formData.append('product', JSON.stringify({
    name: product.name,
    description: product.description,
    basePrice: product.basePrice,
    category: product.category,
    stock: product.stock,
    sizes: product.sizes,
    isActive: product.isActive
  }));
  
  return this.http.post<ProductResponseDto>(this.apiUrl, formData).pipe(
    catchError(this.handleError)
  );
}

  getProducts(): Observable<ProductResponseDto[]> {
    return this.http.get<ProductResponseDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

   // Add method to get product by ID
  getProductById(id: string): Observable<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

   // Add method to update product
  updateProduct(id: string, product: CreateProductDto, images: File[]): Observable<ProductResponseDto> {
    const formData = new FormData();
    
    images.forEach((image, index) => {
      formData.append('images', image, image.name);
    });
    
    formData.append('product', JSON.stringify(product));
    
    return this.http.put<ProductResponseDto>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  loadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/products/categories`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}