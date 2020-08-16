import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ShopingcartService} from '../../services/shopingcart.service';
import {DataServiceService} from '../../services/data-service.service';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalWarningComponent} from '../modal-warning/modal-warning.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import {CategoryModel} from '../../../models/CategoryModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  component: ModalWarningComponent;
  isLoggin = false;
  items = new Array<any>();
  oneCategory: CategoryModel;
  getdata: any;
  category = new Array<CategoryModel>();
  constructor(private modal: NgbModal,
              private auth: AngularFireAuth,
              private data: DataServiceService,
              private getItem: ShopingcartService,
              private fireData: AngularFireDatabase,
              private route: ActivatedRoute) {
    this.data.getCatData.subscribe(value => {
      this.items = value;
      console.log(this.items);
    });
    this.data.findValues.subscribe(value => {
      this.items = value;
    });
    this.auth.onAuthStateChanged(value => {
      if (value) {
        this.isLoggin = true;
      } else {
        this.isLoggin = false;
      }
    });
    this.data.canOpenSideMenu.next(true);
  }

  ngOnDestroy(): void {
    this.data.canSearchItems.next(false);
    }
  ngOnInit() {
    this.data.canSearchItems.next(true);
  }
  itemDetail(name) {
    this.data.itemName.next(name);
  }
  addToCart(name: string) {
    if (this.isLoggin) {
      this.getItem.getItemToCart(name);
    } else {
      const modelRef = this.modal.open(ModalWarningComponent);
      modelRef.componentInstance.title = 'Warning';
    }
  }
}
