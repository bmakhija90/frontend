import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { CategoryComponent } from './components/products/category/category-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/:id/edit', component: ProductFormComponent },
       { path: 'categories', component: CategoryComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
];