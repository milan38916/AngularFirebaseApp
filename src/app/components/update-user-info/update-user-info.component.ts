import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

  displayname;
  user;
  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  updateInfoAboutUser(name: string) {
    this.user = firebase.auth().currentUser;
    this.user.updateProfile({
      displayName: name
    }).then(value => {
      console.log('meno zmenene: ', value);
      this.route.navigate(['user']);
    }).catch(error => {
      console.log('chyba v zmene mena: ', error);
    });
  }
}
