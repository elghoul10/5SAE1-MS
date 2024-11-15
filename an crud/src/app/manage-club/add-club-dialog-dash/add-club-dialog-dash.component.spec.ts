import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubDialogDashComponent } from './add-club-dialog-dash.component';

describe('AddClubDialogDashComponent', () => {
  let component: AddClubDialogDashComponent;
  let fixture: ComponentFixture<AddClubDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClubDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClubDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
