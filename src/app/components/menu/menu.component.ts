import { Component, OnInit } from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {DataServiceService} from '../../services/data-service.service';
import {AddItemFormComponent} from '../add-item-form/add-item-form.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {UserComponent} from '../user/user.component';
import {Router} from '@angular/router';
import {ShopcartComponent} from '../shopcart/shopcart.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggin: boolean;
  username: string;
  isAdmin = false;
  constructor(private route: Router, private data: DataServiceService, private auth: AngularFireAuth, private authSer: AuthService) {
  }

  ngOnInit() {
    this.authSer.isLoggin.subscribe(value => {
      this.isLoggin = value;
    });
    this.authSer.name.subscribe( name => {
      this.username = name;
    });
    this.authSer.role.subscribe(value => {
      if (value === 'admin') {
        this.isAdmin = true;
      }
    });
  }
  changeComponent(change: number) {
    if (change === 0) {
      //this.data.changeComponent(ProductsComponent);
      this.route.navigate(['/products']);
    } else if (change === 1) {
      //this.data.changeComponent(AddItemFormComponent);
      this.route.navigate(['/additem']);
    } else if (change === 2) {
      //this.data.changeComponent(LoginComponent);
      this.route.navigate(['/login']);
    } else if (change === 3) {
      //this.data.changeComponent(RegisterComponent);
      this.route.navigate(['/register']);
    } else if (change === 4) {
      //this.data.changeComponent(UserComponent);
      this.route.navigate(['/user']);
    } else {
      //this.data.changeComponent(ShopcartComponent);
      this.route.navigate(['/cart']);
    }
  }

  logoutClick() {
    this.authSer.logout();
    this.isAdmin = false;
  }

}
