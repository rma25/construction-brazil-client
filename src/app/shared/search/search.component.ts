import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

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
  defaultSearchTextFilter?: string;
  searchTextPlaceholder: string;
  disabled: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent
  extends AbstractBaseComponent
  implements OnInit, OnChanges
{
  @Input() searchDisplay!: SearchDisplay;

  @Output() searchFor = new EventEmitter<SearchFilter>();

  private debounceTime = 300;

  public searchText = new Subject<string>();

  public dateFilterOptions: Array<string>;
  public dateFilterCustomRangeOption = DateFilterOptions.CUSTOM_RANGE;

  public searchFilter: SearchFilter = new SearchFilter(
    this.searchDisplay.defaultSearchTextFilter
  );

  constructor() {
    super();
  }

  ngOnChanges(): void {
    if (
      this.searchDisplay.defaultSearchTextFilter &&
      this.searchDisplay.defaultSearchTextFilter.length > 0 &&
      (!this.searchFilter.searchText ||
        this.searchFilter.searchText.length <= 0)
    ) {
      this.searchFilter.searchText = this.searchDisplay.defaultSearchTextFilter;
    }
  }

  ngOnInit(): void {
    this.setDateFilterOptions();

    this.searchFilter = new SearchFilter(
      this.searchDisplay.defaultSearchTextFilter
    );

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
      this.dateFilterOptions = Object.keys(DateFilterOptions).map((x) => {
        return x;
      });
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
}
