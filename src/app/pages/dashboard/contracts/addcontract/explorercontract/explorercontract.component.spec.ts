import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorercontractComponent } from './explorercontract.component';

describe('ExplorercontractComponent', () => {
  let component: ExplorercontractComponent;
  let fixture: ComponentFixture<ExplorercontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorercontractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorercontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
