import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePropertyPackageComponent } from './tree-property-package.component';

describe('TreePropertyPackageComponent', () => {
  let component: TreePropertyPackageComponent;
  let fixture: ComponentFixture<TreePropertyPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreePropertyPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreePropertyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
