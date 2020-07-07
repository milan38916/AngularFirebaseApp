import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
