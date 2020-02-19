import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingdashboardComponent } from './packagingdashboard.component';

describe('PackagingdashboardComponent', () => {
  let component: PackagingdashboardComponent;
  let fixture: ComponentFixture<PackagingdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
