import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsalifsComponent } from './addsalifs.component';

describe('AddsalifsComponent', () => {
  let component: AddsalifsComponent;
  let fixture: ComponentFixture<AddsalifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsalifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsalifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
