import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {CategoryModel} from '../../../models/CategoryModel';

@Component({
  selector: 'app-sidenav-items',
  templateUrl: './sidenav-items.component.html',
  styleUrls: ['./sidenav-items.component.css']
})
export class SidenavItemsComponent implements OnInit, OnDestroy {

  oneCategory: CategoryModel;
  data: any;
  category = new Array<CategoryModel>();
  isopen: boolean;
  constructor(private dataItems: DataServiceService) {
    this.dataItems.getCat();
    this.dataItems.categories.subscribe(value => {
      this.data = value.toJSON();
      Object.keys(this.data).map(value1 => {
        this.oneCategory = new CategoryModel();
        this.oneCategory.maincat = value1;
        this.oneCategory.subcat = Object.keys(this.data[value1]);
        this.category.push(this.oneCategory);
      });
      this.dataItems.getAllData(this.category);
    });

    // this.dataItems.getMainCategories();
    /*this.dataItems.categories.subscribe(value => {
      this.data = value;
      let i;
      for (i = 0; i < this.data.length; i++) {
        this.dataItems.getSubCategory(value[i].key);
      }
    });
    this.dataItems.subcategories.subscribe(value => {
      this.subdata.push(value);
      // let i;
      /!*for (i = 0; i < this.subdata.length; i++) {
      }*!/
    });*/
    this.dataItems.isopen.subscribe(value => {
      this.isopen = value;
    });
    this.dataItems.canOpenSideMenu.next(true);
  }
  ngOnInit(): void {
  }
  getDataItemBySubCategory(maincat, subcat) {
    this.dataItems.getDataBySubCategory(maincat, subcat);
  }
  getDataItemByMainCategory(maincat, submain) {
    this.dataItems.getDataByMainCategory(maincat, submain);
  }

  closeSideNav(value: boolean) {
    this.dataItems.isopen.next(value);
  }

  ngOnDestroy(): void {
    this.dataItems.canOpenSideMenu.next(false);
  }
}
