import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityListDashComponent } from './university-list-dash.component';

describe('UniversityListDashComponent', () => {
  let component: UniversityListDashComponent;
  let fixture: ComponentFixture<UniversityListDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityListDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityListDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
