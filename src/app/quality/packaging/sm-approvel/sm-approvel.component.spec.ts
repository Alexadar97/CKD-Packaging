import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmApprovelComponent } from './sm-approvel.component';

describe('SmApprovelComponent', () => {
  let component: SmApprovelComponent;
  let fixture: ComponentFixture<SmApprovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmApprovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
