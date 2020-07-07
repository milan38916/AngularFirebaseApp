import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireList} from '@angular/fire/database';
import {DataServiceService} from './services/data-service.service';
import {ProductsComponent} from './components/products/products.component';
import {EnterPageComponent} from './components/enter-page/enter-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFirebaseApp';

  @Input() component: any;
  constructor(private data: DataServiceService) {
    this.data.component.subscribe(object => {
      this.component = object;
    });
  }


}

