import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsAndPrecautionsComponent } from './symptoms-and-precautions.component';

describe('SymptomsAndPrecautionsComponent', () => {
  let component: SymptomsAndPrecautionsComponent;
  let fixture: ComponentFixture<SymptomsAndPrecautionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsAndPrecautionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsAndPrecautionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
