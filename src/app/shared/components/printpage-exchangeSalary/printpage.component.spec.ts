import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintpageComponent } from './printpage.component';

describe('PrintpageComponent', () => {
  let component: PrintpageComponent;
  let fixture: ComponentFixture<PrintpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
