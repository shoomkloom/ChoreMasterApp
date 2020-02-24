import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { ServerApiService } from './services/server-api.service';

@Component({
  selector: 'cm-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chore Master';

  currentUser: User;

  constructor(
    private router: Router,
    private serverApi: ServerApiService
    ) { 
      this.currentUser = this.serverApi.currentUserValue;
    }

  logout() {
      this.router.navigate(['/login']);
  }
}