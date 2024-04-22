import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdDatepickerRangeComponent } from './ngbd-datepicker-range.component';

describe('NgbdDatepickerRangeComponent', () => {
  let component: NgbdDatepickerRangeComponent;
  let fixture: ComponentFixture<NgbdDatepickerRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbdDatepickerRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgbdDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
