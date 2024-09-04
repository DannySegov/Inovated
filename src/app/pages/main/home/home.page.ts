import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());
  constructor() { }

  ngOnInit() {
  }

}
