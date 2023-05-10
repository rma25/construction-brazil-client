import { DateFilterOptions } from '../enums/date-filter-options';

export class SearchFilter {
  constructor() {
    this.dateFilterOption = DateFilterOptions.CUSTOM_RANGE;
  }

  public searchText: string;
  public fromDate?: Date | null;
  public toDate?: Date | null;
  public dateFilterOption?: DateFilterOptions;
}
