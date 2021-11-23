import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SearchItemComponent} from '../search-item/search-item.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLoggin: boolean;
  username: string;
  isAdmin = false;
  canSearch: boolean;
  productShow = false;
  constructor(private route: Router,
              private data: DataServiceService,
              private auth: AngularFireAuth,
              private authSer: AuthService,
              private activateroute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.data.productShow.subscribe(value => {
      this.productShow = value;
    });
    this.data.canSearchItems.subscribe(value => {
      this.canSearch = value;
    });
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
  ngOnDestroy(): void {
    this.data.canSearchItems.unsubscribe();
    this.authSer.isLoggin.unsubscribe();
    this.authSer.name.unsubscribe();
    this.authSer.role.unsubscribe();
  }
  changeComponent(change: number) {
    if (change === 0) {
      this.route.navigate(['/products']);
    } else if (change === 1) {
      this.route.navigate(['/additem']);
    } else if (change === 2) {
      this.route.navigate(['/login']);
    } else if (change === 3) {
      this.route.navigate(['/register']);
    } else if (change === 4) {
      this.route.navigate(['/user']);
    } else if (change === 5) {
      this.route.navigate(['/cart']);
    }
  }
  openDialogSearch() {
    this.dialog.open(SearchItemComponent);
    this.route.navigate([], { queryParams: { dialog: 'search'}, relativeTo: this.activateroute, replaceUrl: true}).then();
  }

  logoutClick() {
    this.authSer.logout();
    this.isAdmin = false;
  }
  openMenu() {
    this.data.isopen.next(true);
  }
}
