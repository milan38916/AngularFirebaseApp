import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(private login: AuthService) { }

  ngOnInit() {
  }
  loginClick() {
    this.login.login(this.email, this.password);
  }

}
