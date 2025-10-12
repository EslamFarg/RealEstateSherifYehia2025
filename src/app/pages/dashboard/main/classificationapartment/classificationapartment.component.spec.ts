import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationapartmentComponent } from './classificationapartment.component';

describe('ClassificationapartmentComponent', () => {
  let component: ClassificationapartmentComponent;
  let fixture: ComponentFixture<ClassificationapartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationapartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationapartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
