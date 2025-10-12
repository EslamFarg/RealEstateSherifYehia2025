import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypemaintenanceComponent } from './typemaintenance.component';

describe('TypemaintenanceComponent', () => {
  let component: TypemaintenanceComponent;
  let fixture: ComponentFixture<TypemaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypemaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypemaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
