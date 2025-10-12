import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsendmessageComponent } from './addsendmessage.component';

describe('AddsendmessageComponent', () => {
  let component: AddsendmessageComponent;
  let fixture: ComponentFixture<AddsendmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsendmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsendmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
