
import { Component, Input, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { UserWithPaidPeriodDto } from '../model/UserWithPaidPeriodDto';
import { PaidPeriodDto } from '../model/PaidPeriodDto';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-ngbd-datepicker-range',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './ngbd-datepicker-range.component.html',
  styleUrl: './ngbd-datepicker-range.component.scss'
})
export class NgbdDatepickerRangeComponent {
  calendar = inject(NgbCalendar);
  managerService = inject(ManagerService);

  @Input() user ?: UserWithPaidPeriodDto;

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate = this.calendar.getToday();
	toDate: NgbDate = this.calendar.getNext(this.fromDate, 'd', 30);

	onDateSelection(date: NgbDate) {
    this.fromDate = date;
    this.toDate = this.calendar.getNext(this.fromDate, 'd', 30);
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	updatePayment(){
		//"dd-MM-yyyy HH:mm:ss"
		//
		let userObject = this.user;
		let selectedFromDateString = 
		this.fromDate.day + '-'
		 + this.fromDate.month + '-'
		 + this.fromDate.year + ' ' + '00:00:00';

		 let selectedToDateString = 
		 this.toDate.day + '-'
		 + this.toDate.month + '-'
		 + this.toDate.year + ' ' + '23:59:00';
		
		if(userObject){
			if(!userObject.paidPeriod){
				let firstPaidPeriod: PaidPeriodDto = {} as PaidPeriodDto;
				firstPaidPeriod.dateFrom = selectedFromDateString;
				firstPaidPeriod.dateTo = selectedToDateString;
				userObject.paidPeriod = firstPaidPeriod;
			} else {
				userObject.paidPeriod.dateFrom = selectedFromDateString;
				userObject.paidPeriod.dateTo = selectedToDateString;
			}
		} else return;

		this.managerService.updatePayment(userObject).subscribe(res =>
			alert('New paid period is set for ' + res.firstName + '\n' +
				'From ' + res.paidPeriod?.dateFrom + '\n' +
				'To ' + res.paidPeriod?.dateTo
			)
		)
	}
}

