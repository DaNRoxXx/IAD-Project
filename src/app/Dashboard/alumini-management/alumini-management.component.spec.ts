import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluminiManagementComponent } from './alumini-management.component';

describe('AluminiManagementComponent', () => {
  let component: AluminiManagementComponent;
  let fixture: ComponentFixture<AluminiManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluminiManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluminiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
