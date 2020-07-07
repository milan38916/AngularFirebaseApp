import { Injectable } from '@angular/core';
import {ProductsComponent} from '../components/products/products.component';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  component = new Subject<any>();
  itemName = new Subject<string>();
  constructor(private db: AngularFirestore) { }
  changeComponent(component: any) {
    this.component.next(component);
  }
  getDataItems() {
    return this.db.collection('items').valueChanges();
  }
}
