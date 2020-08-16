import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {CategoryModel} from '../../../models/CategoryModel';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  oneCategory: CategoryModel;
  data: any;
  category = new Array<CategoryModel>();
  constructor(private dataitem: DataServiceService,
              private dialogRef: MatDialogRef<SearchItemComponent>) {
    this.dataitem.getCat();
    this.dataitem.categories.subscribe(value => {
      this.data = value.toJSON();
      Object.keys(this.data).map(value1 => {
        this.oneCategory = new CategoryModel();
        this.oneCategory.maincat = value1;
        this.oneCategory.subcat = Object.keys(this.data[value1]);
        this.category.push(this.oneCategory);
      });
    });
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

}
