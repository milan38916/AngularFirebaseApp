import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {ItemDetailModel} from '../../models/itemDetail.model';
import {ShopCartModel} from '../../models/ShopCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShopingcartService {

  shopCartItemsArray = [];
  itemDetail: any;
  cartItem: any;
  canAddNewItem = true;
  index: number;
  fullDetailItem: any;
  constructor(private getItem: AngularFireDatabase) { }
  getItemFromDatabase(model: string, brand: string, category: string) {
    this.getItem.object('products/' + category + '/' + brand + '/' + model).valueChanges().subscribe(value => {
      this.fullDetailItem = value;
      this.itemDetail = new ItemDetailModel(category, brand, model);
      this.cartItem = new ShopCartModel(this.fullDetailItem.item.brand,
                                        this.fullDetailItem.item.model,
                                        this.fullDetailItem.item.price, 1, this.itemDetail);
      this.checkSameItemInCart(this.cartItem);
      if (this.canAddNewItem) {
        this.shopCartItemsArray.push(this.cartItem);
      } else {
        this.shopCartItemsArray[this.index].count += 1;
        this.shopCartItemsArray[this.index].price = Number(this.shopCartItemsArray[this.index].price) +
          Number(this.fullDetailItem.item.price);
      }
    });
    this.canAddNewItem = true;
  }
  checkSameItemInCart(cartItem: ShopCartModel) {
    for (const item of this.shopCartItemsArray) {
      if (item.model === cartItem.model) {
        this.canAddNewItem = false;
        this.index = this.shopCartItemsArray.findIndex(i => i.model === cartItem.model);
        break;
      }
    }
  }
  deleteItem(model: string) {
    console.log('delete item: ' + model);
    for (const item of this.shopCartItemsArray) {
      if (item.model === model) {
        if (item.count > 1) {
          console.log('bigger count');
          const index = this.shopCartItemsArray.findIndex(i => i.model === model);
          this.shopCartItemsArray[index].count -= 1;
        } else {
          console.log('small count');
          this.shopCartItemsArray.splice(item, 1);
        }
      }
    }
  }
}
