import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, finalize, forkJoin, from, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ISaveChanges } from 'src/app/shared/interfaces/iSave-changes.interface';
import { RowInfo } from 'src/app/shared/interfaces/rowInfo.interface';
import { PageInfo } from 'src/app/shared/pagination/interfaces/page-info.interface';
import { IPagination } from 'src/app/shared/pagination/pagination.component';
import { Toast } from 'src/app/shared/toasts/models/toast.model';

import { AdminProfissionalDeRodeio } from './models/admin-profissional-de-rodeio.model copy';

@Component({
  selector: 'app-profissionais-de-rodeio',
  templateUrl: './profissionais-de-rodeio.component.html',
  styleUrls: ['./profissionais-de-rodeio.component.css']
})
export class ProfissionaisDeRodeioComponent extends AbstractBaseComponent implements OnInit, IPagination, ISaveChanges, ISearch {
  private pageChanged = new Subject<PageInfo>();

  public errorMessage = 'Please fill in the required fields.';
  public profissionais: Array<FAQ>;
  public searchFilter: SearchFilter;
  public totalPerPage = 10;
  public rowChanges = new Array<RowInfo>();
  public totalFAQs = 0;
  public newFAQ: AdminProfissionalDeRodeio = new AdminProfissionalDeRodeio();
  public isLoading: boolean = true;
  public isUserPaging: boolean = false;

  constructor(
    private modalService: NgbModal,
    private profissionalSettingsData: ProfissionaisDeRodeioSettingsDataService,
    private faqData: FAQDataService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit() {
    this.companyService.selectedCompany
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((currentCompany) =>
          this.faqData.getTotalFAQs(currentCompany.id).pipe(map((totalFAQs) => ({ currentCompany, totalFAQs })))
        ),
        concatMap((x) => this.faqData.getFAQPage(this.totalPerPage, x.currentCompany.id, 1).pipe(map((faqs) => ({ ...x, faqs })))),
        takeUntil(this.destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((x) => {
        if (x.currentCompany) {
          this.currentCompany = x.currentCompany;
        }

        if (x.totalFAQs) {
          this.totalFAQs = x.totalFAQs;
        }

        if (x.faqs) {
          this.faqs = x.faqs;
        }

        this.isLoading = false;
      });

    this.paging();
  }

  private paging(): void {
    // Paging
    this.pageChanged
      .pipe(
        switchMap((pageInfo) => {
          this.isLoading = true;
          this.isUserPaging = true;

          if (this.areThereUnsavedChanges()) {
            return from(this.modalService.open(DialogComponent, { centered: true }).result).pipe(
              concatMap((isYes) => {
                if (isYes === true) {
                  return this.saveChanges().pipe(map((m) => ({ changesSaved: !m.includes(false), ...pageInfo })));
                } else {
                  return of({ changesSaved: true, ...pageInfo });
                }
              })
            );
          } else {
            return of({ changesSaved: true, ...pageInfo });
          }
        }),
        concatMap((item) => {
          if (item && this.currentCompany) {
            const filter = new FAQSearch();

            if (this.searchFilter) {
              filter.searchText = this.searchFilter.searchText;
              filter.totalPerPage = item.totalPerPage;
              filter.currentPage = item.pageNumber;
            }

            // If one of the filtereing parameters were set
            if ((filter.searchText && filter.searchText.length > 0) || filter.startedOn || filter.endedOn) {
              return this.faqData
                .getTotalFAQsSearchResults(filter)
                .pipe(
                  concatMap((totalResults) =>
                    this.faqData
                      .searchFAQs(filter)
                      .pipe(map((faqs) => ({ totalResults, faqs, totalPerPage: item.totalPerPage, changesSaved: item.changesSaved })))
                  )
                );
            } else {
              return this.faqData
                .getTotalFAQs(this.currentCompany.id)
                .pipe(
                  concatMap((totalResults) =>
                    this.faqData
                      .getFAQPage(item.totalPerPage, this.currentCompany.id, item.pageNumber, false)
                      .pipe(map((faqs) => ({ totalResults, faqs, totalPerPage: item.totalPerPage, changesSaved: item.changesSaved })))
                  )
                );
            }
          } else {
            return of({ totalResults: 0, faqs: Array<FAQ>(), totalPerPage: this.totalPerPage, changesSaved: true });
          }
        }),
        takeUntil(this.destroy),
        finalize(() => {
          this.isLoading = false;
          this.isUserPaging = false;
        })
      )
      .subscribe((items) => {
        if (items) {
          this.totalFAQs = items.totalResults;
          this.faqs = items.faqs;
          this.totalPerPage = items.totalPerPage;

          if (items.changesSaved) {
            // Clear changes on No
            this.rowChanges = new Array<RowInfo>();
          }
        }

        this.isLoading = false;
        this.isUserPaging = false;
      });
  }

  public isAddFormValid(): boolean {
    return !!this.newFAQ.question && !!this.newFAQ.answer;
  }

  public onAdd(): void {
    if (!this.currentCompany) {
      this.sharedService.toasts.next(
        new Toast(500, 'Error', 'Ops...Something went wrong! Please contact the administrator.', 3000, true, false)
      );
      return;
    }

    this.newFAQ.isGlobal = this.currentCompany.hasGlobalContent;
    this.newFAQ.companyId = this.currentCompany.id;

    this.profissionalSettingsData
      .insertFAQ(this.newFAQ)
      .pipe(takeUntil(this.destroy))
      .subscribe((newId) => {
        if (newId) {
          // Set the new Id from the database to the existing faq
          this.newFAQ.id = newId;

          this.totalFAQs++;

          // Push to the top of the list of news
          this.faqs.unshift(this.newFAQ);

          this.newFAQ = new FAQ();

          this.sharedService.toasts.next(new Toast(200, 'Success', 'FAQ Inserted.', 3000, false, false));
        }
      });

    // Close modal
    this.modalService.dismissAll();
  }

  public onSearch(searchFilter: SearchFilter): void {
    if (searchFilter) {
      this.searchFilter = searchFilter;

      // Force Pagination to go back to 1, and search for the items
      this.pageChanged.next({ pageNumber: 1, totalPerPage: this.totalPerPage });
    }
  }

  public onPageChange(pageInfo: PageInfo): void {
    this.pageChanged.next(pageInfo);
  }

  public areThereUnsavedChanges(): boolean {
    return this.rowChanges.filter((x) => x.isValid).length > 0;
  }

  public saveChanges(): Observable<boolean[]> {
    // Collect all items that haven't been saved
    return forkJoin(
      this.rowChanges
        .filter((rowChange) => !rowChange.isSaved && rowChange.isValid)
        .map((rowChange) =>
          this.profissionalSettingsData.updateFAQ(rowChange.row).pipe(
            tap((isSaved) => {
              if (isSaved === true) {
                // Remove from the array
                rowChange.isSaved = true;
                this.onRowChanges(rowChange);
              }
            })
          )
        )
    ).pipe(takeUntil(this.destroy));
  }

  public onRowChanges(change: RowInfo) {
    if (change) {
      if (change.isSaved) {
        this.rowChanges = this.rowChanges.filter((x) => x.row.id !== change.row.id);
      } else {
        // If there are not unsaved Ids
        if (!this.rowChanges.some((x) => x.row.id === change.row.id)) {
          this.rowChanges.push(change);
        }
      }
    }
  }

  public onRowRemoved(id: number): void {
    this.faqs = this.faqs.filter((x) => x.id !== id);
    // Reduce the total number of items, until the new data is picked up again
    this.totalFAQs--;
  }

  public openModal(template: TemplateRef<any>) {
    this.sharedService.openModal(template, true, true);
  }
}
