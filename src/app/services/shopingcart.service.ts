import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShopingcartService {

  shopCartItemsArray = [];
  item;
  constructor(private getItem: AngularFirestore) { }
  getItemToCart(name: string) {
    this.getItem.collection('items').doc(name).ref.get().then(doc => {
      this.shopCartItemsArray.push(doc.data());
    });
  }
}
