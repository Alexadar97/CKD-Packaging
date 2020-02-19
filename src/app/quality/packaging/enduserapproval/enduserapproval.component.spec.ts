import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserapprovalComponent } from './enduserapproval.component';

describe('EnduserapprovalComponent', () => {
  let component: EnduserapprovalComponent;
  let fixture: ComponentFixture<EnduserapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnduserapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduserapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
