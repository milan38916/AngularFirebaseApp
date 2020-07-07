import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder} from '@angular/forms';
import {DataServiceService} from '../../services/data-service.service';
import {ProductsComponent} from '../products/products.component';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() about: string;
  @Input() price: string;
  @Input() category: string;
  @Input() os: string;
  @Input() size: string;
  @Input() displaysize: string;
  @Input() weight: string;
  myForm;
  constructor(private db: AngularFirestore, private formBuilder: FormBuilder,
              private data: DataServiceService) {
    this.myForm = this.formBuilder.group({
      id: '',
      name: '',
      about: '',
      price: '',
      category: '',
      os: '',
      size: '',
      displaysize: '',
      weight: ''
    });
  }

  addItem(dataFromForm) {
    this.db.collection('items').doc(dataFromForm.name).set({
      id: dataFromForm.id,
      name: dataFromForm.name,
      price: dataFromForm.price,
      about: dataFromForm.about,
      category: dataFromForm.category,
      os: dataFromForm.os,
      size: dataFromForm.size,
      displaysize: dataFromForm.displaysize,
      weight: dataFromForm.weight
    }).then(
      this.myForm.reset()
    );
    //this.data.changeComponent(ProductsComponent);
  }

  ngOnInit() {
  }

}
