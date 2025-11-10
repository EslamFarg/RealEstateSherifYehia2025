import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendwhatappComponent } from './sendwhatapp.component';

describe('SendwhatappComponent', () => {
  let component: SendwhatappComponent;
  let fixture: ComponentFixture<SendwhatappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendwhatappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendwhatappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
