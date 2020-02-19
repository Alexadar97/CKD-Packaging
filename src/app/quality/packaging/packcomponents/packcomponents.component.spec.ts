import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackcomponentsComponent } from './packcomponents.component';

describe('PackcomponentsComponent', () => {
  let component: PackcomponentsComponent;
  let fixture: ComponentFixture<PackcomponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackcomponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackcomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
