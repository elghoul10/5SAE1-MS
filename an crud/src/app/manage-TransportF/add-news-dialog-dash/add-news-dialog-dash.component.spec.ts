import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsDialogDashComponent } from './add-news-dialog-dash.component';

describe('AddNewsDialogDashComponent', () => {
  let component: AddNewsDialogDashComponent;
  let fixture: ComponentFixture<AddNewsDialogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsDialogDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsDialogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
