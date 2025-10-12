import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerSalaryDisbursementComponent } from './explorer-salary-disbursement.component';

describe('ExplorerSalaryDisbursementComponent', () => {
  let component: ExplorerSalaryDisbursementComponent;
  let fixture: ComponentFixture<ExplorerSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorerSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
