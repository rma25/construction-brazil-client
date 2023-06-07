import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { DateService } from '../services/date.service';
import { DateFilterOptions } from './enums/date-filter-options';
import { SearchFilter } from './models/search-filter.model';

export interface ISearch {
  searchFilter: SearchFilter;
  onSearch(searchFilter: SearchFilter): void;
}

export interface SearchDisplay {
  searchTextColumns?: string;
  fromColumns?: string;
  toColumns?: string;
  dateFilterColumns?: string;
  searchTextPlaceholder: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent extends AbstractBaseComponent implements OnInit {
  @Input() searchDisplay!: SearchDisplay;

  @Output() searchFor = new EventEmitter<SearchFilter>();

  private debounceTime = 300;

  public searchText = new Subject<string>();

  public dateFilterOptions: Array<string>;
  public dateFilterCustomRangeOption: DateFilterOptions.Intervalo_Personalizado =
    DateFilterOptions.Intervalo_Personalizado;

  public searchFilter: SearchFilter = new SearchFilter();

  constructor(private dateService: DateService) {
    super();
  }

  ngOnInit(): void {
    this.setDateFilterOptions();

    this.searchFilter = new SearchFilter();

    this.searchText
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.onSearch();
      });
  }

  private setDateFilterOptions(): void {
    if (this.searchDisplay.dateFilterColumns) {
      this.dateFilterOptions = Object.values(DateFilterOptions);
    }
  }

  public onClearSearchText(): void {
    this.searchFilter.searchText = '';

    this.onSearch();
  }

  public onInput(target: EventTarget | null): void {
    if (target) {
      const element = target as HTMLInputElement;

      this.searchText.next(element.value);
    }
  }

  public onSearch(): void {
    this.searchFor.emit(this.searchFilter);
  }

  public onDateFilterChange(): void {
    // Custom Date Range will be triggered when the user selectes a From & To Date
    if (this.searchFilter.dateFilterOption && this.searchFilter.dateFilterOption !== this.dateFilterCustomRangeOption) {
      const fromAndTo = this.dateService.getDateRangeForDateFilterOption(this.searchFilter.dateFilterOption, true);

      this.searchFilter.fromDate = fromAndTo.from;
      this.searchFilter.toDate = fromAndTo.to;
      this.searchFilter.userOffset = new Date().getTimezoneOffset();

      this.onSearch();
    } else {
      // Reset for Custom Range
      this.searchFilter.fromDate = undefined;
      this.searchFilter.toDate = undefined;
      this.searchFilter.userOffset = new Date().getTimezoneOffset();
    }
  }
}
