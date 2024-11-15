import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniversityDialogDashComponent } from './add-university-dialog-dash.component';

describe('AddUniversityDialogDashComponent', () => {
  let component: AddUniversityDialogDashComponent;
  let fixture: ComponentFixture<AddUniversityDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUniversityDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUniversityDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
