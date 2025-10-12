import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreerealComponent } from './treereal.component';

describe('TreerealComponent', () => {
  let component: TreerealComponent;
  let fixture: ComponentFixture<TreerealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreerealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreerealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
