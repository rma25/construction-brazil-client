import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { DateFilterOptions } from '../search/enums/date-filter-options';

@Injectable({ providedIn: 'root' })
export class DateService {
  constructor(private parserFormatter: NgbDateParserFormatter) {}

  public isMinDate(date: Date | undefined): boolean {
    if (!date) {
      return true;
    }

    const pDate = new Date(date).getFullYear();
    return !date || pDate <= 1900;
  }

  public getParsedDate(date: any, subtractDate: boolean = false): Date {
    let result = new Date();

    if (date) {
      // Probably ngDate object
      if (typeof date === 'object') {
        date = this.getNgParsedDate(date);
      }
      // Moment() month is 0 index, and JavaScript is not
      const parsedDate = moment(date);
      if (parsedDate.isValid()) {
        result = subtractDate ? moment(parsedDate.toDate()).subtract(1, 'month').toDate() : moment(parsedDate.toDate()).toDate();
      } else {
        const newDate = moment(date.year + '-' + date.month + '-' + date.day).toDate();
        result = subtractDate ? moment(newDate).subtract(1, 'month').toDate() : newDate;
      }
    }

    return result;
  }

  public getParsedDateString(date: any, subtractDate: boolean = false): string {
    return date ? this.getParsedDate(date, subtractDate).toDateString() : '';
  }

  public getDateFromString(date: any): Date {
    let newDate = moment(date).toDate();

    if (typeof date === 'string' && date.includes('T')) {
      // This is when there is a 'T' in the middle of the date string (not 'GMT')
      const t = date.split('T');
      if (t && t.length > 0 && !date.includes('GMT')) {
        const filteredDate = t[0];
        newDate = moment(filteredDate).toDate();
      }
    }

    return newDate;
  }

  public getDateMinusDays(days: number, isUtc: boolean = false): Date {
    if (isUtc) return moment().utc().subtract(days, 'd').toDate();

    return moment().subtract(days, 'd').toDate();
  }

  public getDatePlusDays(days: number, isUtc: boolean = false): Date {
    if (isUtc) return moment().utc().add(days, 'd').toDate();

    return moment().add(days, 'd').toDate();
  }

  public getDateRangeForDateFilterOption(dateFilterOption: string, isUtc: boolean): { from: Date | undefined; to: Date | undefined } {
    if (dateFilterOption !== DateFilterOptions.CUSTOM_RANGE) {
      if (!dateFilterOption || dateFilterOption.length === 0) {
        // Reset the date
        return { from: undefined, to: undefined };
      } else if (dateFilterOption === DateFilterOptions.TODAY) {
        return { from: this.getDateNow(isUtc), to: this.getDatePlusDays(1, isUtc) };
      } else if (dateFilterOption === DateFilterOptions.THIRTY_DAYS) {
        return { from: this.getDateMinusDays(30, true), to: this.getDatePlusDays(1, isUtc) };
      } else if (dateFilterOption === DateFilterOptions.SIXTY_DAYS) {
        return { from: this.getDateMinusDays(60, true), to: this.getDatePlusDays(1, isUtc) };
      } else if (dateFilterOption === DateFilterOptions.NINTEY_DAYS) {
        return { from: this.getDateMinusDays(90, true), to: this.getDatePlusDays(1, isUtc) };
      } else {
        return { from: undefined, to: undefined };
      }
    } else {
      return { from: undefined, to: undefined };
    }
  }

  public getFormattedTimeStamp(time: string): string {
    const parsedTime = moment.duration(time);

    const currentDate = new Date();
    currentDate.setHours(parsedTime.hours());
    currentDate.setMinutes(parsedTime.minutes());

    // Format 12 Hour AM/PM
    const formattedTime = moment(currentDate).format('h:mm A');

    return formattedTime;
  }

  public getOneYearAgoDate(): Date {
    return moment().subtract(1, 'year').toDate();
  }

  public getDateNow(isUtc: boolean = false): Date {
    if (isUtc) return moment().utc().toDate();

    return moment().toDate();
  }

  public isDateValid(date: any): boolean {
    if (!date) {
      return false;
    }

    const momentDate = moment(date);

    return momentDate.isValid();
  }

  public getFormattedDate(date: any, includeHour: boolean = false, convertToLocalTime: boolean = false): string {
    if (!date) {
      return '';
    }

    const typeOf = typeof date;
    let formattedDate = moment(date);
    const momentDate = moment(date);

    if (typeOf === 'string' && (date + '').includes('T')) {
      formattedDate = moment.utc(momentDate);
    } else {
      formattedDate = momentDate;
    }

    if (convertToLocalTime) {
      formattedDate = formattedDate.local();
    }

    return includeHour ? formattedDate.format('MMMM Do YYYY, h:mm:ss a') : formattedDate.format('ll');
  }

  public getNgFormattedDate(date: any): NgbDateStruct {
    const parsedDate = moment(date);

    if (!date) {
      return {
        year: 0,
        month: 0,
        day: 0
      };
    }

    // Moment Month is 0 index, therefore it needs to add 1 to be the correct month
    const formattedDate = {
      year: parsedDate.year(),
      month: parsedDate.month() + 1,
      day: parsedDate.date()
    } as NgbDateStruct;

    return formattedDate;
  }

  public getNgParsedDate(event: any): string {
    if (event) {
      const date = this.parserFormatter.format(event);

      return date;
    }

    return '';
  }

  public isLessThanOrCurrentDate(date: Date): boolean {
    return moment().isSameOrBefore(date, 'date');
  }

  public getCurrentTimeStamp(): number {
    const timestamp = moment().toDate().getTime();

    return timestamp;
  }

  public getFormattedDateNow(): string {
    return moment().format('YYYY-MM-DD h:mm:ss a');
  }

  public getFormattedDateTime(date: any): string {
    return this.isDateValid(date) ? moment(date).format('YYYY-MM-DD h:mm:ss a') : date;
  }
}
