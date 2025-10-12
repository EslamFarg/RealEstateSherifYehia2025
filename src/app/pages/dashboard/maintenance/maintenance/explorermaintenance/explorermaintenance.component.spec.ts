import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorermaintenanceComponent } from './explorermaintenance.component';

describe('ExplorermaintenanceComponent', () => {
  let component: ExplorermaintenanceComponent;
  let fixture: ComponentFixture<ExplorermaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorermaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
