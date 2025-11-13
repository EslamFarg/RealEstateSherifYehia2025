import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifynamepermissionComponent } from './modifynamepermission.component';

describe('ModifynamepermissionComponent', () => {
  let component: ModifynamepermissionComponent;
  let fixture: ComponentFixture<ModifynamepermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifynamepermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifynamepermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
