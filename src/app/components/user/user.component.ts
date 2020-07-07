import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser;
  email;
  UID;
  displayname;
  constructor(private user: AngularFireAuth) {
  }

  ngOnInit() {
    this.getUser();
  }
  async getUser() {
    console.log('pouzivatel');
    this.currentUser = await this.user.authState.pipe(first()).toPromise();
    console.log(this.currentUser);
    this.email = this.currentUser.email;
    this.UID = this.currentUser.uid;
    this.displayname = this.currentUser.displayName;
  }

}
