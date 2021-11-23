export class ItemDetailModel {
  category: string;
  brand: string;
  model: string;
  constructor(category: string, brand: string, model: string) {
    this.category = category;
    this.brand = brand;
    this.model = model;
  }
}
