import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryDisbursementComponent } from './add-salary-disbursement.component';

describe('AddSalaryDisbursementComponent', () => {
  let component: AddSalaryDisbursementComponent;
  let fixture: ComponentFixture<AddSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
