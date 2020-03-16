import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { ServerApiService } from '../../services/server-api.service';


@Component({
  selector: 'cm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(private serverApi: ServerApiService) { }

  ngOnInit() {
    this.serverApi.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }
 
}
