import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {DataServiceService} from '../../services/data-service.service';

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
  updatingUser = false;
  constructor(private user: AngularFireAuth, private data: DataServiceService) {
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
  updatingUserActivate() {
    this.updatingUser = true;
    this.data.updateUserAnim.next(true);
  }

}
