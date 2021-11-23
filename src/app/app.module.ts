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
import {NgbActiveModal, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import { SearchItemComponent } from './components/search-item/search-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthguardService} from './guards/authguard.service';
import { NotlogginComponent } from './components/notloggin/notloggin.component';
import { ModalDetailItemComponent } from './components/modal-detail-item/modal-detail-item.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {ShopingcartService} from './services/shopingcart.service';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [{path: 'user', component: UserComponent,
  children: [{path: 'updateUser', component: UpdateUserInfoComponent}]},
  {path: 'login', component: LoginComponent},
  {path: 'additem', component: AddItemFormComponent, canActivate: [AuthguardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: ShopcartComponent},
  {path: 'enter', component: EnterPageComponent},
  {path: '', component: EnterPageComponent},
  {path: 'products', component: ProductsComponent, children: [
    {path: 'search', component: SearchItemComponent}]},
  {path: 'products/:cat', component: ProductsComponent},
  {path: 'products/:cat/:subcat', component: ProductsComponent},
  {path: 'products/:cat/:subcat/:item', component: ProductComponent},
  {path: 'notloggin', component: NotlogginComponent}
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
    ModalWarningComponent,
    SidenavItemsComponent,
    SearchItemComponent,
    DialogComponent,
    NotlogginComponent,
    ModalDetailItemComponent
  ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        CarouselModule,
        MatSliderModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatProgressBarModule,
        NgbCarouselModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatTooltipModule
    ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
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
    ModalWarningComponent,
    SearchItemComponent
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
