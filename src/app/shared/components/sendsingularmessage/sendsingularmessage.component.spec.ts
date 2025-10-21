import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsingularmessageComponent } from './sendsingularmessage.component';

describe('SendsingularmessageComponent', () => {
  let component: SendsingularmessageComponent;
  let fixture: ComponentFixture<SendsingularmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendsingularmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendsingularmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
