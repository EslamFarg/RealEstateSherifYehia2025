import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptytableComponent } from './emptytable.component';

describe('EmptytableComponent', () => {
  let component: EmptytableComponent;
  let fixture: ComponentFixture<EmptytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptytableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
