import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private state: StateService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuth$.next(false);
    this.auth.userId = '';
    this.auth.token = '';

  }

  ngOnDestroy() {

  }

}
