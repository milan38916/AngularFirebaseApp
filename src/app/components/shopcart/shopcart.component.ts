import { Component, OnInit } from '@angular/core';
import {ShopingcartService} from '../../services/shopingcart.service';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {
  constructor(private getItems: ShopingcartService) {
  }

  ngOnInit() {
  }

  deleteItem(name: string) {
    for (const item of this.getItems.shopCartItemsArray) {
      if (item.name === name) {
        this.getItems.shopCartItemsArray.splice(item, 1);
      }
    }
  }

}
