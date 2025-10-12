import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesettingsComponent } from './messagesettings.component';

describe('MessagesettingsComponent', () => {
  let component: MessagesettingsComponent;
  let fixture: ComponentFixture<MessagesettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
