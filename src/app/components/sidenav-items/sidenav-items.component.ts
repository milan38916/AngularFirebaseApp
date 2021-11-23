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
  categories = new Array<CategoryModel>();
  isopen: boolean;
  constructor(private dataItems: DataServiceService) {
    console.log('sidenav data');
    this.dataItems.getCat('menu');
    this.dataItems.categoriesForMenu.subscribe(value => {
      this.data = value.toJSON();
      Object.keys(this.data).map(value1 => {
        this.oneCategory = new CategoryModel();
        this.oneCategory.maincat = value1;
        this.oneCategory.subcat = Object.keys(this.data[value1]);
        this.categories.push(this.oneCategory);
      });
    });
    this.dataItems.isopen.subscribe(value => {
      this.isopen = value;
    });
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
  }
}
