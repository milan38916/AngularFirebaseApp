import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {CategoryModel} from '../../../models/CategoryModel';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit, OnDestroy {

  oneCategory: CategoryModel;
  data: any;
  category = new Array<CategoryModel>();
  searchCat: string;
  priceForFind: number;
  searchText: string;
  constructor(private dataitem: DataServiceService,
              private dialogRef: MatDialogRef<SearchItemComponent>,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataitem.getCat('data');
    this.dataitem.categoriesForSearch.subscribe(value => {
      this.data = value.toJSON();
      Object.keys(this.data).map(value1 => {
        this.oneCategory = new CategoryModel();
        this.oneCategory.maincat = value1;
        this.oneCategory.subcat = Object.keys(this.data[value1]);
        this.category.push(this.oneCategory);
      });
    });
  }
  close() {
    this.dialogRef.close();
    //this.router.navigate([]).then();
  }

  ngOnDestroy(): void {
    if (this.activateRoute.snapshot.queryParams.searchBy === undefined ||
      this.activateRoute.snapshot.queryParams.searchFor === undefined ||
      this.activateRoute.snapshot.queryParams.searchToMaxPrice === undefined) {
      this.router.navigate([]).then();
    }
    this.dataitem.categoriesForData.unsubscribe();
  }
  searchItems(searchText, category, searchCat, priceForFind) {
    this.dataitem.searchItems(searchText, category, searchCat, priceForFind);
    this.router.navigate([], { queryParams: { dialog: 'search',
        searchBy: searchCat,
        searchFor: searchText,
        searchToMaxPrice: priceForFind}}).then();
  }

}
