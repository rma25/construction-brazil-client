import { DateFilterOptions } from '../enums/date-filter-options';

export class SearchFilter {
  constructor() {}

  public searchText: string;
  public fromDate?: Date | null;
  public toDate?: Date | null;
  public dateFilterOption?: DateFilterOptions;
  public userOffset: number = 0;
}
