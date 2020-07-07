import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';
import {ShopingcartService} from '../../services/shopingcart.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  loading = false;
  name: string;
  productDetail: any;
  constructor(private data: DataServiceService, private getItem: ShopingcartService, private fireData: AngularFirestore) {
  }

  ngOnInit() {
    this.getDetailItem();
  }
  async getDetailItem() {
    this.data.itemName.subscribe(value => {
      this.name = value;
      console.log('item1');
      this.fireData.collection('items').doc(this.name).ref.get().then(value1 => {
        this.productDetail = value1.data();
        console.log('data: ', this.productDetail);
        this.loading = true;
        console.log('item2');
      });
    });
  }

}
