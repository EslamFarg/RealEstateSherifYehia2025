import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorersendmessageComponent } from './explorersendmessage.component';

describe('ExplorersendmessageComponent', () => {
  let component: ExplorersendmessageComponent;
  let fixture: ComponentFixture<ExplorersendmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorersendmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorersendmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
