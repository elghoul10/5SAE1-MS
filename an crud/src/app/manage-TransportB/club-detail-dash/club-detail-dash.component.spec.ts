import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailDashComponent } from './club-detail-dash.component';

describe('ClubDetailDashComponent', () => {
  let component: ClubDetailDashComponent;
  let fixture: ComponentFixture<ClubDetailDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubDetailDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubDetailDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
