import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListDashComponent } from './club-list-dash.component';

describe('ClubListDashComponent', () => {
  let component: ClubListDashComponent;
  let fixture: ComponentFixture<ClubListDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubListDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubListDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
