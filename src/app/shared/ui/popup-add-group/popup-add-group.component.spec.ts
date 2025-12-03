import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddGroupComponent } from './popup-add-group.component';

describe('PopupAddGroupComponent', () => {
  let component: PopupAddGroupComponent;
  let fixture: ComponentFixture<PopupAddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAddGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
