import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplApprovelComponent } from './ipl-approvel.component';

describe('IplApprovelComponent', () => {
  let component: IplApprovelComponent;
  let fixture: ComponentFixture<IplApprovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplApprovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
