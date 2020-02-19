import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoffsheetComponent } from './signoffsheet.component';

describe('SignoffsheetComponent', () => {
  let component: SignoffsheetComponent;
  let fixture: ComponentFixture<SignoffsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoffsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoffsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
