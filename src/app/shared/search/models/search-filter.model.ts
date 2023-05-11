import { DateFilterOptions } from '../enums/date-filter-options';

export class SearchFilter {
  constructor() {
    this.dateFilterOption = DateFilterOptions.Intervalo_Personalizado;
  }

  public searchText: string;
  public fromDate?: Date | null;
  public toDate?: Date | null;
  public dateFilterOption?: DateFilterOptions;
}
