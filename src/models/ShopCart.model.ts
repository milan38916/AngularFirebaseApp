import {ItemDetailModel} from './itemDetail.model';

export class ShopCartModel {
  brand: string;
  model: string;
  price: string;
  count: number;
  itemDetail: ItemDetailModel;
  constructor(brand: string, model: string, price: string, count: number, itemDetail: ItemDetailModel) {
    this.brand = brand;
    this.model = model;
    this.price = price;
    this.count = count;
    this.itemDetail = itemDetail;
  }
}
