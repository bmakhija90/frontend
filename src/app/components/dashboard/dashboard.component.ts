import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import{ DashboardStats } from '../../models/dashboard';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardStats = {
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    totalUsers: 0
  };
   private apiUrl = `${environment.apiUrl}/api/dashboard`;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
    this.http.get<DashboardStats>(this.apiUrl).subscribe(data => {
      this.dashboardData = data;
    });
  }
}
