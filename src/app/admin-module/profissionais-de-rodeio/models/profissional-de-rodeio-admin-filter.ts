export class ProfissionalAdminFilter {
  public totalPerPage: number = 0;
  public currentPage: number = 1;
  public searchText: string;
  public startedOn?: Date | null;
  public endedOn?: Date | null;
}
