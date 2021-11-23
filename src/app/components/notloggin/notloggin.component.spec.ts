import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotlogginComponent } from './notloggin.component';

describe('NotlogginComponent', () => {
  let component: NotlogginComponent;
  let fixture: ComponentFixture<NotlogginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotlogginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotlogginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
