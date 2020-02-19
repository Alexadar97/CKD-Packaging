import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportpackagingComponent } from './exportpackaging.component';

describe('ExportpackagingComponent', () => {
  let component: ExportpackagingComponent;
  let fixture: ComponentFixture<ExportpackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportpackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportpackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
