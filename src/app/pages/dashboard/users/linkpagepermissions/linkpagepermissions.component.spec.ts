import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpagepermissionsComponent } from './linkpagepermissions.component';

describe('LinkpagepermissionsComponent', () => {
  let component: LinkpagepermissionsComponent;
  let fixture: ComponentFixture<LinkpagepermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkpagepermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkpagepermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
