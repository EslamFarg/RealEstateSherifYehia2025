import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsmsComponent } from './sendsms.component';

describe('SendsmsComponent', () => {
  let component: SendsmsComponent;
  let fixture: ComponentFixture<SendsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendsmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
