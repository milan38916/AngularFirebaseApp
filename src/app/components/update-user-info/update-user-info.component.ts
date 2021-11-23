import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

  displayname;
  user;
  showComponent = false;
  constructor(private route: Router, private data: DataServiceService) {
  }

  ngOnInit() {
    this.data.updateUserAnim.subscribe(value => {
      this.showComponent = value;
    });
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
