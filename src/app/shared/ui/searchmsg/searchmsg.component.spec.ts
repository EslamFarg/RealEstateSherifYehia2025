import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmsgComponent } from './searchmsg.component';

describe('SearchmsgComponent', () => {
  let component: SearchmsgComponent;
  let fixture: ComponentFixture<SearchmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchmsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
