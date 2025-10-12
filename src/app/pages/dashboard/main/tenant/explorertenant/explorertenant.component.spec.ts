import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorertenantComponent } from './explorertenant.component';

describe('ExplorertenantComponent', () => {
  let component: ExplorertenantComponent;
  let fixture: ComponentFixture<ExplorertenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorertenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorertenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
