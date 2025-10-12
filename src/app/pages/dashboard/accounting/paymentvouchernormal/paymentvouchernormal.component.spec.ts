import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentvouchernormalComponent } from './paymentvouchernormal.component';

describe('PaymentvouchernormalComponent', () => {
  let component: PaymentvouchernormalComponent;
  let fixture: ComponentFixture<PaymentvouchernormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentvouchernormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentvouchernormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
