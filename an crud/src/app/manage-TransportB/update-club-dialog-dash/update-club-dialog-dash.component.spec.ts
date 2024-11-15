import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClubDialogDashComponent } from './update-club-dialog-dash.component';

describe('UpdateClubDialogDashComponent', () => {
  let component: UpdateClubDialogDashComponent;
  let fixture: ComponentFixture<UpdateClubDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClubDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClubDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
