import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlatformService } from '../services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private platformService: PlatformService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // If we're on the server, allow the route to render
    // Authentication will be checked on the client side
    if (!this.platformService.isPlatformBrowser()) {
      return true;
    }
    
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = () => {
  return inject(AuthGuardService).canActivate();
};