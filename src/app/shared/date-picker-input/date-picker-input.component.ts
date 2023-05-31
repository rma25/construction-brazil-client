import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DateService } from '../services/date.service';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.css'],
})
export class DatePickerInputComponent implements OnChanges {
  @Input() calendarText: string | undefined | null;
  @Input() datePicked: Date | undefined | null;

  @Output() datePickedChange = new EventEmitter<Date>();

  public model: NgbDateStruct | undefined;
  public today = this.calendar.getToday();

  constructor(
    private dateService: DateService,
    private calendar: NgbCalendar
  ) {}

  ngOnChanges(): void {
    if (this.datePicked) {
      this.model = this.dateService.getNgFormattedDate(this.datePicked);
    } else {
      this.model = undefined;
    }
  }

  public onDateSelected(event: NgbDateStruct | undefined | null | any): void {
    if (event) {
      // Converts back from NG Date Struct to string
      const dateString = this.dateService.getNgParsedDate(event);

      // Converts date string back to date object
      const date = this.dateService.getDateFromString(dateString);

      this.datePickedChange.emit(date);
    } else {
      this.model = undefined;
      this.datePickedChange.emit(undefined);
    }
  }

  public displayCalendarText(): boolean{
    return !!this.calendarText && this.calendarText.length > 0 && !this.model;
  }

  public minDate(): NgbDateStruct{
    return {
      year: 1900,
      month: 1,
      day: 1
    }
  }
}
