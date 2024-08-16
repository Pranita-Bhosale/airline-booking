import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGetallComponent } from './schedule-getall.component';

describe('ScheduleGetallComponent', () => {
  let component: ScheduleGetallComponent;
  let fixture: ComponentFixture<ScheduleGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleGetallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
