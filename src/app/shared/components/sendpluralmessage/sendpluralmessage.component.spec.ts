import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpluralmessageComponent } from './sendpluralmessage.component';

describe('SendpluralmessageComponent', () => {
  let component: SendpluralmessageComponent;
  let fixture: ComponentFixture<SendpluralmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendpluralmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendpluralmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
