import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorersalifsComponent } from './explorersalifs.component';

describe('ExplorersalifsComponent', () => {
  let component: ExplorersalifsComponent;
  let fixture: ComponentFixture<ExplorersalifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorersalifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorersalifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
