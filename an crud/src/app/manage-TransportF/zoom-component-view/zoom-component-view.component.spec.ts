import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomComponentViewComponent } from './zoom-component-view.component';

describe('ZoomComponentViewComponent', () => {
  let component: ZoomComponentViewComponent;
  let fixture: ComponentFixture<ZoomComponentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomComponentViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
