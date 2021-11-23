export class BasicDataModel {
  id: string;
  category: string;
  brand: string;
  model: string;
  constructor(id: string, category: string, brand: string, model: string) {
    this.id = id;
    this.category = category;
    this.brand = brand;
    this.model = model;
  }
}
