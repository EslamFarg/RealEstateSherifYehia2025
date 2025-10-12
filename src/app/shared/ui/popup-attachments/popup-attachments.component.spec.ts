import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAttachmentsComponent } from './popup-attachments.component';

describe('PopupAttachmentsComponent', () => {
  let component: PopupAttachmentsComponent;
  let fixture: ComponentFixture<PopupAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAttachmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
