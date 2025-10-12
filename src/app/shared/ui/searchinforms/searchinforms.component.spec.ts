import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchinformsComponent } from './searchinforms.component';

describe('SearchinformsComponent', () => {
  let component: SearchinformsComponent;
  let fixture: ComponentFixture<SearchinformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchinformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchinformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
