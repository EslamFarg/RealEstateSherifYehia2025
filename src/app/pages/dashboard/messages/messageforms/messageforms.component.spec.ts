import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageformsComponent } from './messageforms.component';

describe('MessageformsComponent', () => {
  let component: MessageformsComponent;
  let fixture: ComponentFixture<MessageformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
