import { Injectable } from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {PhotoUpload} from '../../models/photoUpload';
import * as firebase from 'firebase';
import UploadTask = firebase.storage.UploadTask;
import TaskEvent = firebase.storage.TaskEvent;
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../../models/Product';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/dialog/dialog.component';
import {BasicDataModel} from '../../models/BasicData.model';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  detailName: string;
  detailBrand: string;
  detailCategory: string;
  component = new Subject<any>();
  itemName = new Subject<string>();
  isopen = new Subject<boolean>();
  categoriesForMenu = new Subject<any>();
  categoriesForData = new Subject<any>();
  categoriesForSearch = new Subject<any>();
  subcategories = new Subject<any>();
  canSearchItems = new Subject<boolean>();
  searchvalueA: string;
  searchvalueB: string;
  findValues = new Subject<any>();
  getUrl = new Subject<string>();
  private uploadToStorage: UploadTask;
  getCatData = new Subject<any>();
  getMainData = new Array<any>();
  getDetailData = new Subject<any>();
  uploadProgress = new Subject<number>();
  productShow = new Subject<boolean>();
  isItemFind = false;
  isFindItemSub = new Subject<boolean>();
  updateUserAnim = new Subject<boolean>();
  refreshData = new Subject<String>();
  isDataLoad = new Subject<boolean>();
  constructor(private db: AngularFirestore,
              private realTimeDatabase: AngularFireDatabase,
              private dialog: MatDialog) {
  }
  changeComponent(component: any) {
    this.component.next(component);
  }
  getDetailItem(cat, subcat, item) {
    this.realTimeDatabase.object('products/' + cat + '/' + subcat + '/' + item).valueChanges().subscribe(value => {
      this.getDetailData.next(value);
    });
  }
  getAllData(category, startLog) {
    this.refreshData.next("refresh");
    this.getMainData = new Array<any>();
    let i;
    let j;
    let product;
    for (i = 0; i < category.length; i++) {
      for (j = 0; j < category[i].subcat.length; j++) {
        this.realTimeDatabase.list('products/' + category[i].maincat + '/' + category[i].subcat[j]).valueChanges().subscribe(value => {
          product = value;
          for (const item of product) {
            product = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
            this.getCatData.next(product);
          }
        });
      }
    }
    this.isFindItemSub.next(false);
  }
  getDataBySubCategory(maincat, subcat) {
    let sendItemData;
    let product;
    this.refreshData.next("refresh");
    this.realTimeDatabase.list('products/' + maincat + '/' + subcat).valueChanges().subscribe(value => {
      product = value;
      for (const item of product) {
        sendItemData = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
        this.getCatData.next(sendItemData);
      }
    });
    this.isFindItemSub.next(false);
  }
  getDataByMainCategory(maincat, submain) {
    let sendItemData;
    let product;
    this.getMainData = new Array<any>();
    let i;
    this.refreshData.next("refresh");
    for (i = 0; i < submain.length; i++) {
      this.realTimeDatabase.list('products/' + maincat + '/' + submain[i]).valueChanges().subscribe(value => {
        product = value;
        for (const item of product) {
          sendItemData = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
          this.getCatData.next(sendItemData);
        }
      });
    }
    this.isFindItemSub.next(false);
  }
  searchItems(searchText, category, findBy, price) {
    console.log("find values " + category + " "+ searchText);

    let getItem;
    this.getMainData = new Array<any>();
    let i;
    let j;
    let sendItemData;
    this.refreshData.next("refresh");
    for (i = 0; i < category.length; i++) {
      for (j = 0; j < category[i].subcat.length; j++) {
        this.realTimeDatabase.list('products/' + category).
        valueChanges().
        subscribe(value => {
          console.log(JSON.stringify(value));
          getItem = value;
          for (const item of getItem) {
              if (findBy === 'brand') {
                if (item.item.brand.includes(searchText) && item.item.price <= price) {
                  sendItemData = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
                  this.findValues.next(sendItemData);
                  this.isItemFind = true;
                }
              } else if (findBy === 'category') {
                if (item.item.category.includes(searchText)  && item.item.price <= price) {
                  sendItemData = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
                  this.findValues.next(sendItemData);
                  this.isItemFind = true;
                }
              } else if (findBy === 'model') {
                if (item.item.model.includes(searchText)  && item.item.price <= price) {
                  sendItemData = new BasicDataModel(item.item.id, item.item.category, item.item.brand, item.item.model);
                  this.findValues.next(sendItemData);
                  this.isItemFind = true;
                }
              }
          }
        });
      }
    }
    if (!this.isItemFind) {
      this.getDetailData.next([]);
      this.findValues.next(this.getMainData);
      this.isFindItemSub.next(true);
    } else {
      this.isItemFind = false;
      this.isFindItemSub.next(false);
    }
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
  addItem(product: Product) {
    this.realTimeDatabase.database.ref('products/' + product.category + '/' + product.brand + '/' + product.model).set({
      item: product
    }).then(value => {
      this.dialog.open(DialogComponent, {data: {action: 'Succesfull, product was add to database'}});
    }).catch(() => {
      this.dialog.open(DialogComponent, {data: {action: 'Error'}});
    });
  }
  getCat(use: string) {
    firebase.database().ref('products').once('value').then(value => {
      if (use === 'menu') {
        this.categoriesForMenu.next(value);
      } else if (use === 'data') {
        this.categoriesForData.next(value);
      } else if (use === 'search') {
        this.categoriesForSearch.next(value);
      }
    });
  }
}
