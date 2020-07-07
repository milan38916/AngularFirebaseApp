import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import {RouterModule, Routes} from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { MenuComponent } from './components/menu/menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import {loggedIn} from '@angular/fire/auth-guard';
import { ShopcartComponent } from './components/shopcart/shopcart.component';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';
import { EnterPageComponent } from './components/enter-page/enter-page.component';
import { ProductComponent } from './components/product/product.component';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{path: 'user', component: UserComponent,
  children: [{path: 'updateUser', component: UpdateUserInfoComponent}]},
  {path: 'login', component: LoginComponent},
  {path: 'additem', component: AddItemFormComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:productid', component: ProductComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: ShopcartComponent},
  {path: 'enter', component: EnterPageComponent},
  {path: '', component: EnterPageComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    AddItemFormComponent,
    ProductsComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ShopcartComponent,
    UpdateUserInfoComponent,
    EnterPageComponent,
    ProductComponent,
    ModalWarningComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ProductsComponent,
    AddItemFormComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ShopcartComponent,
    UpdateUserInfoComponent,
    EnterPageComponent,
    ProductComponent,
    ModalWarningComponent
  ],
  providers: [
    AddItemFormComponent,
    ProductsComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ShopcartComponent,
    UpdateUserInfoComponent,
    EnterPageComponent,
    ProductComponent,
    ModalWarningComponent,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
