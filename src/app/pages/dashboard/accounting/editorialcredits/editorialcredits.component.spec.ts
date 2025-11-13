import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialcreditsComponent } from './editorialcredits.component';

describe('EditorialcreditsComponent', () => {
  let component: EditorialcreditsComponent;
  let fixture: ComponentFixture<EditorialcreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorialcreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialcreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
