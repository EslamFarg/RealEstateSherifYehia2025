import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytrackingComponent } from './activitytracking.component';

describe('ActivitytrackingComponent', () => {
  let component: ActivitytrackingComponent;
  let fixture: ComponentFixture<ActivitytrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitytrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitytrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
