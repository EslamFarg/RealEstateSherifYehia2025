import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAttachmentsComponent } from './input-attachments.component';

describe('InputAttachmentsComponent', () => {
  let component: InputAttachmentsComponent;
  let fixture: ComponentFixture<InputAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputAttachmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
