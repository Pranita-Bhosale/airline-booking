import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFetchComponent } from './schedule-fetch.component';

describe('ScheduleFetchComponent', () => {
  let component: ScheduleFetchComponent;
  let fixture: ComponentFixture<ScheduleFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFetchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
