import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoffreportComponent } from './signoffreport.component';

describe('SignoffreportComponent', () => {
  let component: SignoffreportComponent;
  let fixture: ComponentFixture<SignoffreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoffreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoffreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
