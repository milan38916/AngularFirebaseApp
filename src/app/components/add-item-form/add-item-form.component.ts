import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder} from '@angular/forms';
import {DataServiceService} from '../../services/data-service.service';
import {ProductsComponent} from '../products/products.component';
import {map} from 'rxjs/operators';
import {PhotoUpload} from '../../../models/photoUpload';
import {Product} from '../../../models/Product';
import {SmartPhoneModel} from '../../../models/SmartPhoneModel';
import {PCmodel} from '../../../models/PCmodel';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MonitorModel} from '../../../models/MonitorModel';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {
  id: number;
  brand: string;
  model: string;
  about: string;
  price: string;
  category: string;
  os: string;
  size: string;
  weight: number;
  color: string;
  imgurl = [];
  addFiles: FileList;
  product: any;
  uploadProgressValue: number;
  uploadProgressActualValue = 0;
  androidVersion: any;
  iosVersion: any;
  processor: any;
  countCpuCores: any;
  cpuFrequency: any;
  opMemory: any;
  graphis: any;
  memory: any;
  batteryCapacity: any;
  userBatteryChange: any;
  chargePower: any;
  chargeTime: any;
  wifi: any;
  wifiVersion: any;
  bluetooth: any;
  btVersion: any;
  gps: any;
  nfc: any;
  sensors: any;
  jack: any;
  usb: any;
  usbType: any;
  simCard: any;
  simType: any;
  use: any;
  radCpu: any;
  modelCpu: any;
  frekvenciaCpu: any;
  pocetJadier: any;
  cacheCpu: any;
  boostCpu: any;
  tdpCpu: any;
  modelGpu: any;
  memoryGpu: any;
  coresGpu: any;
  motherboard: any;
  motherboardSocket: any;
  diskBrand: any;
  diskType: any;
  diskSize: any;
  diskUnit: any;
  sizeCase: any;
  weightPc: any;
  uhlopriecka: string;
  rozlisenie: string;
  typrozlisenia: string;
  displej: string;
  obnovovaciaFrekvencia: string;
  odozva: string;
  jas: string;
  kontrast: string;
  pomerStran: string;
  povrchDispleja: string;
  konstrukcia: string;
  porty: string;
  vlastnosti: string;
  funkcie: string;
  sirka: string;
  vyska: string;
  hlbka: string;
  hmotnost: string;
  constructor(private db: AngularFirestore,
              private formBuilder: FormBuilder,
              private data: DataServiceService,
              private snackbar: MatSnackBar) {
    this.data.getUrl.subscribe(value => {
      this.imgurl.push(value);
    });
  }

  addItem(category) {
    if (category === 'Smartphones') {
      this.product = new SmartPhoneModel();
      this.product.id = this.id;
      this.product.category = this.category;
      this.product.brand = this.brand;
      this.product.model = this.model;
      this.product.about = this.about;
      this.product.price = this.price;
      this.product.use = this.use;
      this.product.os = this.os;
      this.product.processor = this.processor;
      this.product.countCpuCores = this.countCpuCores;
      this.product.cpuFrequency = this.cpuFrequency;
      this.product.operatingMemory = this.opMemory;
      this.product.graphis = this.graphis;
      this.product.memory = this.memory;
      this.product.batteryCapacity = this.batteryCapacity;
      this.product.userBatteryChange = this.userBatteryChange;
      this.product.chargePower = this.chargePower;
      this.product.chargeTime = this.chargeTime;
      this.product.wifi = this.wifi;
      this.product.wifitype = this.wifiVersion;
      this.product.bluetooth = this.bluetooth;
      this.product.bluetoothtype = this.btVersion;
      this.product.gps = this.gps;
      this.product.nfc = this.nfc;
      this.product.sensors = this.sensors;
      this.product.usb = this.usb;
      this.product.usbType = this.usbType;
      this.product.jack = this.jack;
      this.product.simCard = this.simCard;
      this.product.simType = this.simType;
      this.product.images = this.imgurl;
    } else if (category === 'PCs') {
      this.product = new PCmodel();
      this.product.id = this.id;
      this.product.category = this.category;
      this.product.brand = this.brand;
      this.product.model = this.model;
      this.product.about = this.about;
      this.product.price = this.price;
      this.product.use = this.use;
      this.product.os = this.os;
      this.product.rad = this.radCpu;
      this.product.frekvencia = this.frekvenciaCpu;
      this.product.modelProc = this.modelCpu;
      this.product.pocetJadier = this.pocetJadier;
      this.product.boost = this.boostCpu;
      this.product.cache = this.cacheCpu;
      this.product.TDP = this.tdpCpu;
      this.product.modelGraphis = this.modelGpu;
      this.product.streamProc = this.coresGpu;
      this.product.memory = this.memoryGpu;
      this.product.modelOfBoard = this.motherboard;
      this.product.socket = this.motherboardSocket;
      this.product.brandofdisk = this.diskBrand;
      this.product.diskSize = this.diskSize;
      this.product.diskType = this.diskType;
      this.product.sizeOfPC = this.sizeCase;
      this.product.weight = this.weightPc;
      this.product.images = this.imgurl;
    } else if (category === 'Monitors') {
      this.product = new MonitorModel();
      this.product.id = this.id;
      this.product.category = this.category;
      this.product.brand = this.brand;
      this.product.model = this.model;
      this.product.about = this.about;
      this.product.price = this.price;
      this.product.uhlopriecka = this.uhlopriecka;
      this.product.rozlisenie = this.rozlisenie;
      this.product.typrozlisenia = this.typrozlisenia;
      this.product.displej = this.displej;
      this.product.obnovovaciaFrekvencia = this.obnovovaciaFrekvencia;
      this.product.odozva = this.odozva;
      this.product.jas = this.jas;
      this.product.kontrast = this.kontrast;
      this.product.pomerStran = this.pomerStran;
      this.product.povrchDispleja = this.povrchDispleja;
      this.product.konstrukcia = this.konstrukcia;
      this.product.porty = this.porty;
      this.product.vlastnosti = this.vlastnosti;
      this.product.funkcie = this.funkcie;
      this.product.sirka = this.sirka;
      this.product.vyska = this.vyska;
      this.product.hlbka = this.hlbka;
      this.product.hmotnost = this.hmotnost;
      this.product.images = this.imgurl;
    }
    if (this.id === undefined ||
      this.category === undefined ||
      this.brand === undefined ||
      this.model === undefined ||
      this.about === undefined ||
      this.price === undefined) {
      this.opensnackbar('Missing data in form!!!');
    } else {
      this.data.addItem(this.product);
    }
  }

  ngOnInit() {
  }
  uploadItem($event) {
    this.addFiles = $event.target.files;
    this.uploadProgressActualValue = 0;
    this.postItemPhoto();
  }
  postItemPhoto() {
    this.uploadProgressValue = 100;
    let i;
    for (i = 0; i < this.addFiles.length; i++) {
      const file = this.addFiles.item(i);
      const myFile = new PhotoUpload(file);
      this.data.updateItemImage(this.uploadProgressValue / this.addFiles.length, myFile, this.category, this.brand, this.model, this.color);
      this.data.uploadProgress.subscribe(value => {
        this.uploadProgressActualValue += value;
      });
    }
  }

  opensnackbar(message: string) {
    this.snackbar.open(message, 'Close', {duration: 10000});
  }

}
