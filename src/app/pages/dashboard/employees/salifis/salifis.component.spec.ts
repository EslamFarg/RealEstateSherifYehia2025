import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalifisComponent } from './salifis.component';

describe('SalifisComponent', () => {
  let component: SalifisComponent;
  let fixture: ComponentFixture<SalifisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalifisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalifisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
