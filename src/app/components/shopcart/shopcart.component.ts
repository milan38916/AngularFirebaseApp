import { Component, OnInit } from '@angular/core';
import {ShopingcartService} from '../../services/shopingcart.service';
import {ItemDetailModel} from '../../../models/itemDetail.model';
import {MatDialog} from '@angular/material/dialog';
import {ModalDetailItemComponent} from '../modal-detail-item/modal-detail-item.component';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {
  emptyCart: boolean;
  constructor(private getItems: ShopingcartService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.emptyCart = this.getItems.shopCartItemsArray.length !== 0;
  }

  deleteItem(model: string) {
    this.getItems.deleteItem(model);
  }

  showProductDetail(itemDetail: ItemDetailModel) {
    this.matDialog.open(ModalDetailItemComponent, {data: {model: itemDetail.model, brand: itemDetail.brand, type: itemDetail.category}});
  }
  changeValue($event) {
    console.log($event.value);
  }
  backToProducts() {
    this.router.navigate(['products']).then();
  }

}
