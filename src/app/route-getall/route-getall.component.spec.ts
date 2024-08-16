import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteGetallComponent } from './route-getall.component';

describe('RouteGetallComponent', () => {
  let component: RouteGetallComponent;
  let fixture: ComponentFixture<RouteGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteGetallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
