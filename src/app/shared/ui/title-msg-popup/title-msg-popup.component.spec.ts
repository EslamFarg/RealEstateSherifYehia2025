import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMsgPopupComponent } from './title-msg-popup.component';

describe('TitleMsgPopupComponent', () => {
  let component: TitleMsgPopupComponent;
  let fixture: ComponentFixture<TitleMsgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleMsgPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleMsgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
