import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email;
  password;
  constructor(private register: AuthService) { }

  ngOnInit() {
  }
  registerClick() {
    this.register.register(this.email, this.password);
  }
}
