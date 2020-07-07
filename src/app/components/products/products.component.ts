import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {ShopingcartService} from '../../services/shopingcart.service';
import {DataServiceService} from '../../services/data-service.service';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalWarningComponent} from '../modal-warning/modal-warning.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  component: ModalWarningComponent;
  isLoggin = false;
  items: Observable<any[]>;
  constructor(private modal: NgbModal, private auth: AngularFireAuth, private data: DataServiceService, private getItem: ShopingcartService, private authSer: AuthService) {
    this.items = this.data.getDataItems();
    //console.log(this.items);
    this.auth.onAuthStateChanged(value => {
      if (value) {
        this.isLoggin = true;
      } else {
        this.isLoggin = false;
      }
    });
  }
  ngOnInit() {
  }
  itemDetail(name) {
    this.data.itemName.next(name);
  }
  addToCart(name: string) {
    if (this.isLoggin) {
      console.log('zapisujem');
      this.getItem.getItemToCart(name);
    } else {
      console.log('nezapisujem');
      const modelRef = this.modal.open(ModalWarningComponent);
      modelRef.componentInstance.title = 'Warning';
    }
  }
}
