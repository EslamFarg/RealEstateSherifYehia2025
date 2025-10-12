import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewaddcontractComponent } from './newaddcontract.component';

describe('NewaddcontractComponent', () => {
  let component: NewaddcontractComponent;
  let fixture: ComponentFixture<NewaddcontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewaddcontractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewaddcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
