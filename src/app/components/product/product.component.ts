import {AfterViewInit, Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';
import {ShopingcartService} from '../../services/shopingcart.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  loading = false;
  canUpdate = false;
  name: string;
  productDetail: any;
  mySlideImages: any;

  mySlideOptions = {items: 1, dots: true, nav: true};
  myCarouselOptions = {items: 3, dots: true, nav: true};
  constructor(private data: DataServiceService,
              private getItem: ShopingcartService,
              private fireData: AngularFireDatabase,
              private route: ActivatedRoute,
              private auth: AuthService) {
  }
  ngOnInit() {
    this.data.getDetailItem(this.route.snapshot.paramMap.get('cat'),
      this.route.snapshot.paramMap.get('subcat'),
      this.route.snapshot.paramMap.get('item'));
    this.data.getDetailData.subscribe(value => {
      console.log(value);
      this.productDetail = value;
    });
    this.auth.isLoggin.subscribe(value => {
      this.canUpdate = value;
    });
  }

  ngOnDestroy(): void {
  }


}
