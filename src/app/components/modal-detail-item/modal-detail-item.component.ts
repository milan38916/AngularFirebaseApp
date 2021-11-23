import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataServiceService} from '../../services/data-service.service';
import {ShopingcartService} from '../../services/shopingcart.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalWarningComponent} from '../modal-warning/modal-warning.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-detail-item',
  templateUrl: './modal-detail-item.component.html',
  styleUrls: ['./modal-detail-item.component.css']
})
export class ModalDetailItemComponent implements OnInit, OnDestroy {

  itemDetail: any;
  canShow = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dataservice: DataServiceService,
              private dialogRef: MatDialogRef<ModalDetailItemComponent>,
              private shopService: ShopingcartService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dataservice.getDetailItem(this.data.type, this.data.brand, this.data.model);
    this.dataservice.getDetailData.subscribe(value => {
      this.itemDetail = value;
      console.log('getdata' + this.itemDetail);
      this.canShow = true;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  addItemToCart(model: string, brand: string, category: string) {
    this.shopService.getItemFromDatabase(model, brand, category);
    const modalRef = this.snackBar.openFromComponent(ModalWarningComponent, {duration: 3000});
  }
  showMoreDetails(model: string, brand: string, category: string) {
    this.closeDialog();
    this.router.navigate(['products/' + category + '/' + brand + '/' + model]);
  }

  ngOnDestroy(): void {
    this.router.navigate([]).then();
  }

}
