import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgattachmentsComponent } from './imgattachments.component';

describe('ImgattachmentsComponent', () => {
  let component: ImgattachmentsComponent;
  let fixture: ComponentFixture<ImgattachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgattachmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgattachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
