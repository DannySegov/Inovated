import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/interfaces/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private authService = inject(AuthService);

  public user: Signal<User | null> = computed(() => this.authService.currentUser());

  constructor() { }

  ngOnInit() {
    this.checkUserAuthentication();
  }

  private checkUserAuthentication() {
    this.authService.checkAuthentication().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Actualiza la propiedad user si la autenticación es válida
        this.user = computed(() => this.authService.currentUser());
      } else {
        // Maneja el caso en que la autenticación no es válida
        this.user = computed(() => null);
      }
    });
  }
}