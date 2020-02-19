import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MheApprovelComponent } from './mhe-approvel.component';

describe('MheApprovelComponent', () => {
  let component: MheApprovelComponent;
  let fixture: ComponentFixture<MheApprovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MheApprovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MheApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
