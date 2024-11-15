import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormHandlerComponent } from './error-form-handler.component';

describe('ErrorFormHandlerComponent', () => {
  let component: ErrorFormHandlerComponent;
  let fixture: ComponentFixture<ErrorFormHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFormHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFormHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
