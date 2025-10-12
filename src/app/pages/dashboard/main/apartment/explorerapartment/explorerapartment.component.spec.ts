import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerapartmentComponent } from './explorerapartment.component';

describe('ExplorerapartmentComponent', () => {
  let component: ExplorerapartmentComponent;
  let fixture: ComponentFixture<ExplorerapartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorerapartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerapartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
