import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintemployeeComponent } from './printemployee.component';

describe('PrintemployeeComponent', () => {
  let component: PrintemployeeComponent;
  let fixture: ComponentFixture<PrintemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
