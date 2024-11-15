import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityDetailDashComponent } from './university-detail-dash.component';

describe('UniversityDetailDashComponent', () => {
  let component: UniversityDetailDashComponent;
  let fixture: ComponentFixture<UniversityDetailDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityDetailDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityDetailDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
