import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDashboardComponent } from './event-list-dashboard.component';

describe('EventListDashboardComponent', () => {
  let component: EventListDashboardComponent;
  let fixture: ComponentFixture<EventListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
