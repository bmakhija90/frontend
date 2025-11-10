import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { PlatformService } from './services/platform.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Dashboard';
  
  constructor(
    public authService: AuthService,
    private platformService: PlatformService,
    private router: Router
  ) {}
  
  logout(): void {
    this.authService.logout();
    if (this.platformService.isPlatformBrowser()) {
      this.router.navigate(['/login']);
    }
  }

  // Method to check if user is authenticated (for template)
  isAuthenticated(): boolean {
    return this.platformService.isPlatformBrowser() && this.authService.isAuthenticated();
  }
}