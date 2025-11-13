import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcardComponent } from './accountcard.component';

describe('AccountcardComponent', () => {
  let component: AccountcardComponent;
  let fixture: ComponentFixture<AccountcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
