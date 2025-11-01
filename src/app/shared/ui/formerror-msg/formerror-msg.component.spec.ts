import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormerrorMsgComponent } from './formerror-msg.component';

describe('FormerrorMsgComponent', () => {
  let component: FormerrorMsgComponent;
  let fixture: ComponentFixture<FormerrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormerrorMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormerrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
