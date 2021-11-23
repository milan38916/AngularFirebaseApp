import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailItemComponent } from './modal-detail-item.component';

describe('ModalDetailItemComponent', () => {
  let component: ModalDetailItemComponent;
  let fixture: ComponentFixture<ModalDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
