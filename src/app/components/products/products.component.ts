import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopingcartService} from '../../services/shopingcart.service';
import {DataServiceService} from '../../services/data-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalWarningComponent} from '../modal-warning/modal-warning.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryModel} from '../../../models/CategoryModel';
import {MatDialog} from '@angular/material/dialog';
import {ModalDetailItemComponent} from '../modal-detail-item/modal-detail-item.component';
import {BasicDataModel} from '../../../models/BasicData.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  component: any;
  isLoggin = false;
  items = new Array<BasicDataModel>();
  oneCategory: CategoryModel;
  getdata: any;
  category = new Array<CategoryModel>();
  emptyItems = false;
  categoryData: any;
  dataVisible = false;
  constructor(private auth: AngularFireAuth,
              private data: DataServiceService,
              private getItem: ShopingcartService,
              private fireData: AngularFireDatabase,
              private route: ActivatedRoute,
              private routing: Router,
              private matDialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.items.length = 0;
    this.data.canSearchItems.next(false);
  }
  ngOnInit() {
    this.items.length = 0;
    this.data.refreshData.subscribe(value => {
      this.items.length = 0;
    });
    this.data.isDataLoad.subscribe(value => {
      this.dataVisible = value;
    });
    this.data.categoriesForData.subscribe(value => {
      this.categoryData = value.toJSON();
      Object.keys(this.categoryData).map(value1 => {
        this.oneCategory = new CategoryModel();
        this.oneCategory.maincat = value1;
        this.oneCategory.subcat = Object.keys(this.categoryData[value1]);
        this.category.push(this.oneCategory);
      });
    });
    this.data.isFindItemSub.subscribe(value => {
      this.emptyItems = value;
    });
    this.data.productShow.next(true);
    this.data.canSearchItems.next(true);
    
    this.data.getCatData.subscribe(value => {
      this.items.push(value);
    });
    this.data.findValues.subscribe(value => {
      this.items.push(value);
    });
    this.auth.onAuthStateChanged(value => {
      if (value) {
        this.isLoggin = true;
      } else {
        this.isLoggin = false;
      }
    });
    this.data.canSearchItems.next(true);
  }
  itemDetail(id, name, subcategory, category) {
    this.items.length = 0;
    this.routing.navigate([], {relativeTo: this.route, queryParams: { productID: id}}).then();
    this.matDialog.open(ModalDetailItemComponent, {data: { model: name,  brand: subcategory, type: category}});
  }
}
