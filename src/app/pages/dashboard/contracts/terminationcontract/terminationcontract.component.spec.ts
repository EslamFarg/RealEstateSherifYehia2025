import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationcontractComponent } from './terminationcontract.component';

describe('TerminationcontractComponent', () => {
  let component: TerminationcontractComponent;
  let fixture: ComponentFixture<TerminationcontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminationcontractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminationcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
