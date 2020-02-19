import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingManualsComponent } from './packaging-manuals.component';

describe('PackagingManualsComponent', () => {
  let component: PackagingManualsComponent;
  let fixture: ComponentFixture<PackagingManualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingManualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingManualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
