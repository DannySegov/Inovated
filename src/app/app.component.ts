import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './shared/interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.authService.validateToken().subscribe( () => {
      console.log('checkAuthentication finished')
    })
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  /*
  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus());
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });
  */

  public authStatusChangedEffect = effect(() => {
    const authStatus = this.authService.authStatus();
    console.log('Auth status changed:', authStatus);

    switch (authStatus) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/main/home');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth');
        return;
    }
  });
}