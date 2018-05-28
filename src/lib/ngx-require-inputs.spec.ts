import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRequireInputsComponent } from './ngx-require-inputs.component';

describe('NgxRequireInputsComponent', () => {
  let component: NgxRequireInputsComponent;
  let fixture: ComponentFixture<NgxRequireInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRequireInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRequireInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
