import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShopingcartService {

  shopCartItemsArray = [];
  item;
  constructor(private getItem: AngularFireDatabase) { }
  getItemToCart(name: string) {
    return this.getItem.list('products/' +  + '/').valueChanges().subscribe(cartitem => {
      this.shopCartItemsArray.push(cartitem);
    });
  }
}
