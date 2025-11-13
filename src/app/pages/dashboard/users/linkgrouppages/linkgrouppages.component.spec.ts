import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkgrouppagesComponent } from './linkgrouppages.component';

describe('LinkgrouppagesComponent', () => {
  let component: LinkgrouppagesComponent;
  let fixture: ComponentFixture<LinkgrouppagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkgrouppagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkgrouppagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
