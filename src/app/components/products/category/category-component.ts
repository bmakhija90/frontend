import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface Category {
  id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './category-component.html',
  styleUrls: ['./category-component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);
  apiUrl = `${environment.apiUrl}/api/products/categories`;

  newCategory: Partial<Category> = { name: '', description: '' };
  isEditing: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<Category[]>(this.apiUrl).subscribe({
      next: (data) => (this.dataSource.data = data),
      error: () => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    });
  }

  addCategory(): void {
    if (!this.newCategory.name?.trim()) return;
    this.http.post<Category>(this.apiUrl, this.newCategory).subscribe({
      next: (category) => {
        this.dataSource.data = [...this.dataSource.data, category];
        this.newCategory = { name: '', description: '' };
        this.snackBar.open('Category added!', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Failed to add category', 'Close', { duration: 3000 })
    });
  }

  editCategory(category: Category): void {
    this.isEditing = category.id;
  }

  saveCategory(category: Category): void {
    // optional: implement PUT /api/products/categories/{id}
    this.isEditing = null;
    this.snackBar.open('Category updated (mock save)', 'Close', { duration: 2000 });
  }
}
