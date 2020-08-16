import { Injectable } from '@angular/core';
import {ProductsComponent} from '../components/products/products.component';
import {from, Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {PhotoUpload} from '../../models/photoUpload';
import * as firebase from 'firebase';
import UploadTask = firebase.storage.UploadTask;
import TaskEvent = firebase.storage.TaskEvent;
import {AngularFireDatabase} from '@angular/fire/database';
import set = Reflect.set;
import {Product} from '../../models/Product';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/dialog/dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  component = new Subject<any>();
  itemName = new Subject<string>();
  isopen = new Subject<boolean>();
  categories = new Subject<any>();
  subcategories = new Subject<any>();
  canSearchItems = new Subject<boolean>();
  canOpenSideMenu = new Subject<boolean>();
  searchvalueA: string;
  searchvalueB: string;
  findValues = new Subject<any>();
  getUrl = new Subject<string>();
  private uploadToStorage: UploadTask;
  getCatData = new Subject<any>();
  getMainData = new Array<any>();
  getDetailData = new Subject<any>();
  uploadProgress = new Subject<number>();
  constructor(private db: AngularFirestore,
              private realTimeDatabase: AngularFireDatabase,
              private dialog: MatDialog) {
  }
  changeComponent(component: any) {
    this.component.next(component);
  }
  getDetailItem(cat, subcat, item) {
    console.log(cat);
    this.realTimeDatabase.object('products/' + cat + '/' + subcat + '/' + item).valueChanges().subscribe(value => {
      this.getDetailData.next(value);
    });
  }
  getAllData(category) {
    this.getMainData = new Array<any>();
    let i;
    let j;
    for (i = 0; i < category.length; i++) {
      for (j = 0; j < category[i].subcat.length; j++) {
        this.realTimeDatabase.list('products/' + category[i].maincat + '/' + category[i].subcat[j]).valueChanges().subscribe(value => {
          this.getMainData = this.getMainData.concat(value);
          this.getCatData.next(this.getMainData);
        });
      }
    }
  }
  getDataBySubCategory(maincat, subcat) {
    this.realTimeDatabase.list('products/' + maincat + '/' + subcat).valueChanges().subscribe(value => {
      this.getCatData.next(value);
    });
  }
  getDataByMainCategory(maincat, submain) {
    this.getMainData = new Array<any>();
    let i;
    for (i = 0; i < submain.length; i++) {
      this.realTimeDatabase.list('products/' + maincat + '/' + submain[i]).valueChanges().subscribe(value => {
        this.getMainData = this.getMainData.concat(value);
        this.getCatData.next(this.getMainData);
      });
    }
  }
  searchItems($event, category) {
    this.searchvalueA = $event.target.value;
    this.searchvalueB = $event.target.value + '\uf8ff';
/*    this.findValues.next(this.db.collection('products').doc('Smartphones').
    collection('Apple', ref => ref.orderBy('model').limit(4).startAt(this.searchvalueA).endAt(this.searchvalueB)).valueChanges());*/
    this.getMainData = new Array<any>();
    let i;
    let j;
    for (i = 0; i < category.length; i++) {
      for (j = 0; j < category[i].subcat.length; j++) {
        this.realTimeDatabase.list('products/' + category[i].maincat + '/' + category[i].subcat[j],
          ref => ref.orderByChild('model').
          limitToLast(100).
          startAt(this.searchvalueA).
          endAt(this.searchvalueB)).
        valueChanges().
        subscribe(value => {
          this.getMainData = this.getMainData.concat(value);
          this.findValues.next(this.getMainData);
          console.log('search: ' + this.getMainData);
        });
      }
    }
  }
  getSubCategory(name: string) {
    this.realTimeDatabase.list('products/' + name).snapshotChanges().subscribe(value => {
      this.subcategories.next(value);
    });
  }
  getItemBySearch() {
    return this.db.collection('products').doc('Smartphones').
    collection('Apple', ref => ref.orderBy('model').limit(4).startAt(this.searchvalueA).endAt(this.searchvalueB)).valueChanges();
  }
  updateItemImage(process, upload: PhotoUpload, category, brand, model, color) {
    const storage = firebase.storage().ref();
    this.uploadToStorage = storage.child(category + '/' + brand + '/' + model + '/' + color + '/' + upload.file.name).put(upload.file);
    this.uploadToStorage.on(TaskEvent.STATE_CHANGED, snapshot => {
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, () => {
      }, () => {
      this.uploadToStorage.snapshot.ref.getDownloadURL().then(value => {
        this.getUrl.next(value);
        this.uploadProgress.next(process);
      });
    });
  }
  getMainCategories() {
    this.realTimeDatabase.list('products').snapshotChanges().subscribe(value => {
      this.categories.next(value);
    });
  }
  addItem(product: Product) {
    this.realTimeDatabase.database.ref('products/' + product.category + '/' + product.brand + '/' + product.model).set({
      item: product
    }).then(value => {
      this.dialog.open(DialogComponent, {data: {action: 'Succesfull, product was add to database'}});
    }).catch(() => {
      this.dialog.open(DialogComponent, {data: {action: 'Error'}});
    });
  }
  getCat() {
    firebase.database().ref('products').once('value').then(value => {
      this.categories.next(value);
    });
  }
}
